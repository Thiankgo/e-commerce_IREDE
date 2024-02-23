const express = require('express')
const { pool } = require('./poolConnection.js')

let peoples = []

const app = express()
const port = 3000

app.use(express.json())

app.get("/products", async (req, res) => {
    var data = await pool.query("select p.name, p.email, array_agg(t.phone) as \"phones\" from people as p left join phones as t on p.id = t.id_people group by p.id;")
    return res.json(data.rows)
})

app.get("/items", async (req, res) => {
    var data = await pool.query("select p.product_name, p.image, i.price, c.category from items as i left join products as p on i.id_product = p.id left join category as c on p.id_category = c.id;")
    return res.json(data.rows)
})

app.get("/category", async (req, res) => {
    var data = await pool.query("select c.category from category as c;")
    return res.json(data.rows)
})

app.post("/category", async (req, res) => {
    try {
        const { category } = req.body;

        if(typeof(category) !== "string") throw "Invalid category"

        var data = await pool.query("insert into category (category) values ($1) returning id;", [category])
        
        var idCat = data.rows[0].id;

        return res.status(200).json({ idCat, category })
    }
    catch (err) {
        console.log("erro ao add person")
        return res.status(500).send(err)

    }
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