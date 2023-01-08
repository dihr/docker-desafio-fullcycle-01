const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

const sql0 = `INSERT INTO people(name)
              values ('Diogo Ribeiro');`
const sql1 = `INSERT INTO people(name)
              values ('Maria Silva');`
const sql2 = `INSERT INTO people(name)
              values ('Joana Pereira');`
connection.query(sql0)
connection.query(sql1)
connection.query(sql2)


app.get('/', (req, res) => {
    connection.query('select * from people', function (err, result, fields) {
        if (err) {
            console.log(err)
        } else {
            const rows = JSON.parse(JSON.stringify(result));
            let response = '<h1>Full Cycle</h1>'
            rows.forEach(element => {
                response += `<li>${element.name}</li>`
            });
            res.send(response)
        }
    })
})

app.listen(port, () => {
    console.log('Rodando na porta' + port)
})