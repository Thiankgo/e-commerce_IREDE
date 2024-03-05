const express = require("express")
const cors = require("cors")
const format = require("pg-format")
const jwt = require("jsonwebtoken")

const { pool } = require("./poolConnection.js")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const secret = "ecommerce_secret"

const options = {
    expiresIn: "5m"
}

const iss = "ecommerce back"
const aud = "ecommerce front"

app.get("/auth", async (req, res) => {
    const { token } = req.query

    try {
        if (token.length <= 0) throw { message: "Token vazio", status: 400 }

        const payload = jwt.verify(token, secret)

        const userQuery = await pool.query(`select id from users where id = $1`, [payload.sub])
        if (userQuery.rows.length === 0) {
            throw { message: "Erro interno do servidor", status: 500 }
        }

        return res.status(200).json({ message: "Token válido", status: 200 })
    } catch (error) {
        const status = error.status || 500
        const message = error.message || "Erro interno do servidor"
        if (error.name === "TokenExpiredError") return res.status(500).json({ message: error.name, status })
        return res.status(status).json({ message, status })
    }
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        if (email.length <= 0) throw { message: "Email vazio", status: 400 }
        if (password.length <= 0) throw { message: "Senha vazia", status: 400 }

        const userQuery = await pool.query("SELECT id, name, email, avatar FROM users WHERE email = $1 AND password = $2",
            [email, password])
        if (userQuery.rows.length === 0) {
            throw { message: "E-mail ou senha incorretos", status: 401 }
        }

        const user = userQuery.rows[0]

        const payload = {
            sub: user.id,
            iss: iss,
            aud: aud
        }

        return res.status(200).json({ ...user, token: jwt.sign(payload, secret, options) })

    } catch (error) {
        console.error("Erro ao fazer login:", error)
        const status = error.status || 500
        const message = error.message || "Erro interno do servidor"
        return res.status(status).json({ message, status })
    }
})


app.post("/register", async (req, res) => {
    const { name, email, password, avatar } = req.body

    try {
        if (name.length <= 0) throw { message: "Nome vazio", status: 400 }
        if (email.length <= 0) throw { message: "Email vazio", status: 400 }
        if (password.length < 5) throw { message: "Senha deve conter 5 caracteres", status: 400 }

        const userExistQuery = await pool.query("SELECT id FROM users WHERE email = $1", [email])
        if (userExistQuery.rows.length > 0) {
            throw { message: "E-mail já está em uso", status: 400 }
        }

        const newUserQuery = await pool.query(
            "INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id, name, email, avatar",
            [name, email, password, avatar]
        )

        const user = newUserQuery.rows[0]

        const payload = {
            sub: user.id,
            iss: iss,
            aud: aud
        }

        return res.status(201).json({ ...user, token: jwt.sign(payload, secret, options) })
    } catch (error) {
        console.error("Erro ao registrar usuário:", error)
        const status = error.status || 500
        const message = error.message || "Erro interno do servidor"
        return res.status(status).json({ message, status })
    }
})

app.get("/products", async (req, res) => {
    try {
        const productsQuery = await pool.query("SELECT p.id, p.name, p.description, p.price, p.quantity, p.image, c.name AS category FROM products as p JOIN category as c ON p.id_category = c.id")

        const products = productsQuery.rows

        return res.status(200).json(products)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
        return res.status(500).json({ error: "Erro interno do servidor" })
    }
})

app.get("/products/:id", async (req, res) => {
    const productId = req.params.id

    try {
        const productQuery = await pool.query("SELECT p.id, p.name, p.description, p.price, p.quantity, p.image, c.name AS category FROM products as p JOIN category as c ON p.id_category = c.id  WHERE p.id = $1",
            [productId])

        const product = productQuery.rows[0]

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" })
        }

        return res.status(200).json(product)
    } catch (error) {
        console.error("Erro ao buscar produto:", error)
        return res.status(500).json({ error: "Erro interno do servidor" })
    }
})


app.post("/products", async (req, res) => {
    const { name, description, price, quantity, image, category } = req.body

    try {
        const categoryIdQuery = await pool.query("SELECT id FROM category WHERE name = $1", [category])
        const categoryId = categoryIdQuery.rows[0].id

        const newProductQuery = await pool.query(
            "INSERT INTO products (name, description, price, quantity, image, id_category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, description, price, quantity, image, categoryId]
        )

        const newProduct = newProductQuery.rows[0]

        return res.status(201).json(newProduct)
    } catch (error) {
        console.error("Erro ao adicionar produto:", error)
        return res.status(500).json({ error: "Erro interno do servidor" })
    }
})

app.get("/items", async (req, res) => {
    const { token } = req.query

    try {
        const payload = jwt.verify(token, secret)

        const itemsQuery = await pool.query(`
            select 
                i.id as item_id,
                i.quantity,
                i.price,
                p.name,
                p.image,
                c.name as category,
                s.date
            from 
                items as i
            join 
                users as u on i.id_user = u.id
            join 
                products as p on i.id_product = p.id
            join 
                category as c on p.id_category = c.id
            join 
                sales as s on i.id_sale = s.id
            where 
                u.id = $1
        `, [payload.sub])

        const sales = itemsQuery.rows.map(item => ({
            id: item.item_id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            date: item.date,
            quantity: item.quantity
        })).sort((a, b) => a.id - b.id)

        return res.status(200).json(sales)
    } catch (error) {
        console.error("Erro ao buscar itens:", error)
        const status = error.status || 500
        const message = error.message || "Erro interno do servidor"
        if (error.name === "TokenExpiredError") return res.status(500).json({ message: error.name, status })
        return res.status(status).json({ message, status })
    }
})


app.post("/items", async (req, res) => {
    const { email, token, sales } = req.body

    const client = await pool.connect()
    try {
        const payload = jwt.verify(token, secret)

        await client.query("BEGIN")

        const userQuery = await client.query(format("SELECT id FROM users WHERE email = %L", email))
        if (userQuery.rows.length === 0) {
            throw { message: "Usuário não encontrado", status: 404 }
        }
        const userId = userQuery.rows[0].id

        if (userId !== payload.sub) throw {}

        const newSaleQuery = await client.query("INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP) RETURNING id")
        const saleId = newSaleQuery.rows[0].id

        const productsPurchasedQuery = await client.query(format("SELECT id, price, quantity FROM products WHERE id IN (%L)", sales.map(sale => sale.product)))
        const productsPurchased = {}
        productsPurchasedQuery.rows.forEach(row => {
            productsPurchased[row.id] = { id: row.id, price: row.price, quantity: row.quantity }
        })

        const itemValues = sales.map(sale => [
            userId,
            sale.product,
            sale.quantity,
            productsPurchased[sale.product].price,
            saleId
        ])

        const insertItemsQuery = format("INSERT INTO items (id_user, id_product, quantity, price, id_sale) VALUES %L", itemValues)

        await client.query(insertItemsQuery)

        sales.map(sale => {
            if (productsPurchased[sale.product].quantity - sale.quantity < 0) {
                throw {}
            }
        })

        const productValues = sales.map(sale => [
            sale.product,
            parseInt(productsPurchased[sale.product].quantity - sale.quantity)
        ])

        console.log(productValues)

        const quantityProductQuery = format(`
            update products as p set
                quantity = c.quantity::int
            from (values %L) 
            as c(id, quantity) 
            where c.id = p.id::int`
            , productValues)


        console.log(quantityProductQuery);
        await client.query(quantityProductQuery)

        await client.query("COMMIT")
        return res.status(201).json({ message: "Itens adicionados com sucesso" })
    } catch (error) {
        await client.query("ROLLBACK")
        console.error("Erro ao buscar itens:", error)
        const status = error.status || 500
        const message = error.message || "Erro interno do servidor"
        if (error.name === "TokenExpiredError") return res.status(500).json({ message: error.name, status })
        return res.status(status).json({ message, status })
    } finally {
        client.release()
    }
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

app.listen(port, async () => {
    console.log(`Server started at https://localhost:${port}/`)
})