const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
require('dotenv/config')

const app_port = process.env.APP_PORT || 3003
const app_address = `http://localhost`
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})
const dependences = { connection }

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/data', (req, res) => {
  res.send(`
  <h2>Data</h2>
  <p><a href="/">Home</a></p>
  `)
})

const customerRoutes = require('./routes/customers')
app.use('/customers', customerRoutes(dependences))

app.listen(app_port, err => {
  if (err) {
    console.log(`App doesn't work: `, err)
  } else {
    console.log(`App works at ${app_address}:${app_port}`)
  }
})
