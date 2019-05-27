const loggingSqlCommand = require('../utils/log')

const dataFields_InsertUpdate = (data) => {
    return `name = '${data.name}'`
        .concat((data.birth_day) ? `, birth_day = '${data.birth_day}'` : ``)
}

const dataFields_Selects = () => {
    return `BIN_TO_UUID(id) id, name, birth_day`
}

const findAll = connection => {
    return new Promise((resolve, reject) => {
        const sql = `select ${dataFields_Selects()} from customers order by name;`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'findAll')
        }
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const findById = (connection, id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT ${dataFields_Selects()} FROM customers where id = UUID_TO_BIN('${id}');`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'findById')
        }
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                if (results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve({})
                }
            }
        })
    })
}

const findLikeName = (connection, name) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT ${dataFields_Selects()} FROM customers where name like '${name}%' order by name;`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'findLikeName')
        }
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into customers set id = UUID_TO_BIN('${data.id}'), ${dataFields_InsertUpdate(data)};`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'create')
        }
        connection.query(sql, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const update = (connection, id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `update customers set ${dataFields_InsertUpdate(data)} where id = UUID_TO_BIN('${id}');`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'update')
        }
        connection.query(sql, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const deleteOne = (connection, id) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from customers where id = uuid_to_bin('${id}') limit 1;`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'delete')
        }
        connection.query(sql, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    findLikeName,
    create,
    update,
    deleteOne,
}