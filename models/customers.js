const loggingSqlCommand = require('../utils/log')

const findAll = connection => {
    return new Promise((resolve, reject) => {
        const sql = `select BIN_TO_UUID(id) id, name from customers order by name;`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql)
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
        const sql = `SELECT BIN_TO_UUID(id) id, name FROM customers where id = UUID_TO_BIN('${id}'); `
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql)
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

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into customers set id = UUID_TO_BIN('${data.id}'), name = '${data.name}';`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql)
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
        const sql = `update customers set name = '${data.name}' where id = UUID_TO_BIN('${id}');`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql)
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
            loggingSqlCommand(sql)
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
    create,
    update,
    deleteOne,
}