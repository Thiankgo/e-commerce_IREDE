const express = require('express')
const { pool } = require('./poolConnection.js')

let peoples = []

const app = express()
const port = 3000

app.use(express.json())

app.get("/pessoas", async (req, res) => {
    var data = await pool.query("select p.name, p.email, array_agg(t.phone) as \"phones\" from people as p left join phones as t on p.id = t.id_people group by p.id;")
    return res.json(data.rows)
})

app.post("/pessoas/add", async (req, res) => {
    try {
        const { name, email, phones } = req.body;

        const client = await pool.connect();

        const insertQuery = "insert into people (name, email) values ($1, $2) returning id;"
        var data = await client.query(insertQuery, [name, email])
        var idPerson = data.rows[0].id;

        if (idPerson != undefined) {
            const insertQueryPhone = "insert into phones (phone, id_people) values ($1, $2);"
            if (phones && phones.length > 0) {
                for (let phone of phones) {
                    var data = await client.query(insertQueryPhone,
                        [phone, idPerson])
                }
            }
        }

        client.release();

        return res.status(200).json({ name, email, phones })
    }
    catch (err) {
        console.log("erro ao add person")
        return res.status(500).send(err)

    }
})

app.post("/pessoas/edit", async (req, res) => {
    try {
        const { name, email, phones } = req.body;

        const client = await pool.connect();
        //todo
        const insertQuery = "update people (name, email) values ($1, $2) returning id;"
        var data = await client.query(insertQuery, [name, email])
        var idPerson = data.rows[0].id;

        if (idPerson != undefined) {
            const insertQueryPhone = "insert into phones (phone, id_people) values ($1, $2);"
            if (phones && phones.length > 0) {
                for (let phone of phones) {
                    var data = await client.query(insertQueryPhone,
                        [phone, idPerson])
                }
            }
        }

        client.release();

        return res.status(200).json({ name, email, phones })
    }
    catch (err) {
        console.log("erro ao add person")
        return res.status(500).send(err)

    }
})

app.listen(port, async () => {
    console.log(`Server started at https://localhost:${port}/`)
})