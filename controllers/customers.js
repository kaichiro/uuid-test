const uuid = require('uuid/v4')

const customersModels = require('../models/customers')

const index = async (connection, req, res) => {
    const customers = await customersModels.findAll(connection)
    res.render('customers/index', {
        customers,
    })
}

const createForm = (req, res) => {
    res.render('customers/create')
}
const createProcess = async (connection, req, res) => {
    const data = {
        id: uuid(),
        name: req.body.name
    }
    await customersModels.create(connection, data)
    res.redirect('/customers')
}

const updateForm = async (connection, req, res) => {
    const customer = await customersModels.findById(connection, req.params.id)
    res.render('customers/update', {
        customer,
    })
}
const updateProcess = async (connection, req, res) => {
    const idCustumer = req.params.id
    const data = {
        id: idCustumer,
        name: req.body.name
    }
    await customersModels.update(connection, idCustumer, data)
    res.redirect('/customers')
}

const deleteOne = async (connection, req, res) => {
    await customersModels.deleteOne(connection, req.params.id)
    res.redirect('/customers')
}

module.exports = {
    index,
    createForm,
    createProcess,
    updateForm,
    updateProcess,
    deleteOne,
}