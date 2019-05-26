const routes = ({ connection }) => {
    const router = require('express').Router()
    const customer = require('../controllers/customers')

    router.get('/', customer.index.bind(null, connection))

    router.get('/create', customer.createForm)
    router.post('/create', customer.createProcess.bind(null, connection))

    router.get('/update/:id', customer.updateForm.bind(null, connection))
    router.post('/update/:id', customer.updateProcess.bind(null, connection))

    router.get('/delete/:id', customer.deleteOne.bind(null, connection))

    return router
}

module.exports = routes