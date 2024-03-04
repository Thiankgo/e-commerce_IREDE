const express = require('express')
const cors = require('cors')
const { pool } = require('./poolConnection.js')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/products', async (req, res) => {
    try {
        const productsQuery = await pool.query("SELECT p.id, p.name, p.description, p.price, p.quantity, p.image, c.name AS category FROM products as p JOIN category as c ON p.id_category = c.id");

        const products = productsQuery.rows;

        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


app.post('/products', async (req, res) => {
    const { name, description, price, quantity, image, category } = req.body

    try {
        const categoryIdQuery = await pool.query('SELECT id FROM category WHERE name = $1', [category])
        const categoryId = categoryIdQuery.rows[0].id

        const newProductQuery = await pool.query(
            'INSERT INTO products (name, description, price, quantity, image, id_category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, price, quantity, image, categoryId]
        )

        const newProduct = newProductQuery.rows[0]

        res.status(201).json(newProduct)
    } catch (error) {
        console.error('Erro ao adicionar produto:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
})

app.get("/items", async (req, res) => {
    var data = await pool.query("select p.product_name, p.image, i.price, c.category from items as i left join products as p on i.id_product = p.id left join category as c on p.id_category = c.id")
    return res.json(data.rows)
})

app.get("/category", async (req, res) => {
    var data = await pool.query("select * from category")
    return res.json(data.rows)
})

app.post("/category", async (req, res) => {
    try {
        const { name, image } = req.body

        if (typeof name !== "string") {
            throw { message: "Invalid category", status: 400 }
        }

        const result = await pool.query(
            "INSERT INTO category (name, image) VALUES ($1, $2) RETURNING id, name, image",
            [name, image]
        )

        const { id, name: insertedCategory, image: insertedImage } = result.rows[0]

        return res.status(201).json({ id, name: insertedCategory, image: insertedImage })
    } catch (err) {
        console.error("Error adding category:", err.message)
        const status = err.status || 500
        const message = err.message || "Internal server error"
        return res.status(status).json({ message, status })
    }
})


// app.post("/pessoas/add", async (req, res) => {
//     try {
//         const { name, email, phones } = req.body

//         const client = await pool.connect()

//         const insertQuery = "insert into people (name, email) values ($1, $2) returning id"
//         var data = await client.query(insertQuery, [name, email])
//         var idPerson = data.rows[0].id

//         if (idPerson != undefined) {
//             const insertQueryPhone = "insert into phones (phone, id_people) values ($1, $2)"
//             if (phones && phones.length > 0) {
//                 for (let phone of phones) {
//                     var data = await client.query(insertQueryPhone,
//                         [phone, idPerson])
//                 }
//             }
//         }

//         client.release()

//         return res.status(200).json({ name, email, phones })
//     }
//     catch (err) {
//         console.log("erro ao add person")
//         return res.status(500).send(err)

//     }
// })

// app.post("/pessoas/edit", async (req, res) => {
//     try {
//         const { name, email, phones } = req.body

//         const client = await pool.connect()
//         //todo
//         const insertQuery = "update people (name, email) values ($1, $2) returning id"
//         var data = await client.query(insertQuery, [name, email])
//         var idPerson = data.rows[0].id

//         if (idPerson != undefined) {
//             const insertQueryPhone = "insert into phones (phone, id_people) values ($1, $2)"
//             if (phones && phones.length > 0) {
//                 for (let phone of phones) {
//                     var data = await client.query(insertQueryPhone,
//                         [phone, idPerson])
//                 }
//             }
//         }

//         client.release()

//         return res.status(200).json({ name, email, phones })
//     }
//     catch (err) {
//         console.log("erro ao add person")
//         return res.status(500).send(err)

//     }
// })

app.listen(port, async () => {
    console.log(`Server started at https://localhost:${port}/`)
})