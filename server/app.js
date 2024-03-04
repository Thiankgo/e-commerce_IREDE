const express = require('express')
const cors = require('cors')
const format = require('pg-format')
const { pool } = require('./poolConnection.js')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userQuery = await pool.query('SELECT id, name, email, avatar FROM users WHERE email = $1 AND password = $2',
            [email, password]);
        if (userQuery.rows.length === 0) {
            throw { message: 'E-mail ou senha incorretos', status: 401 };
        }

        const user = userQuery.rows[0];

        res.status(200).json({ ...user, token: '12345' });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';
        res.status(status).json({ message, status });
    }
});


app.post('/register', async (req, res) => {
    const { name, email, password, avatar } = req.body;

    try {
        const userExistQuery = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userExistQuery.rows.length > 0) {
            throw { message: 'E-mail já está em uso', status: 400 };
        }

        const newUserQuery = await pool.query(
            'INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id, name, email, avatar',
            [name, email, password, avatar]
        );

        const user = newUserQuery.rows[0];

        res.status(201).json({ ...user, token: '12345' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';
        res.status(status).json({ message, status });
    }
});


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

app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const productQuery = await pool.query("SELECT p.id, p.name, p.description, p.price, p.quantity, p.image, c.name AS category FROM products as p JOIN category as c ON p.id_category = c.id  WHERE p.id = $1",
            [productId]);

        const product = productQuery.rows[0];

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
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

app.get('/items', async (req, res) => {
    const { email } = req.query;

    try {
        const itemsQuery = await pool.query(`
            SELECT 
                i.id AS item_id,
                i.quantity,
                i.price,
                p.name AS product_name,
                p.image AS product_image,
                c.name AS category,
                s.date AS sale_date
            FROM 
                items i
            JOIN 
                users u ON i.id_user = u.id
            JOIN 
                products p ON i.id_product = p.id
            JOIN 
                category c ON p.id_category = c.id
            JOIN 
                sales s ON i.id_sale = s.id
            WHERE 
                u.email = $1
        `, [email]);

        const sales = itemsQuery.rows.map(item => ({
            id: item.item_id,
            name: item.product_name,
            price: item.price,
            image: item.product_image,
            category: item.category,
            date: item.sale_date,
            quantity: item.quantity
        }));

        res.status(200).json(sales);
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


app.post('/items', async (req, res) => {
    const { email, sales } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN;');

        const userQuery = await client.query(format('SELECT id FROM users WHERE email = %L', email));
        if (userQuery.rows.length === 0) {
            throw { message: 'Usuário não encontrado', status: 404 };
        }
        const userId = userQuery.rows[0].id;

        const newSaleQuery = await client.query('INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP) RETURNING id');
        const saleId = newSaleQuery.rows[0].id;

        const productPricesQuery = await client.query(format('SELECT id, price FROM products WHERE id IN (%L)', sales.map(sale => sale.product)));
        const productPrices = {};
        productPricesQuery.rows.forEach(row => {
            productPrices[row.id] = row.price;
        });

        const itemValues = sales.map(sale => [
            userId,
            sale.product,
            sale.quantity,
            productPrices[sale.product],
            saleId
        ]);

        const insertItemsQuery = format('INSERT INTO items (id_user, id_product, quantity, price, id_sale) VALUES %L', itemValues);

        await client.query(insertItemsQuery);

        await client.query('COMMIT');
        res.status(201).json({ message: 'Itens adicionados com sucesso' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erro ao adicionar itens:', error);
        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';
        res.status(status).json({ message, status });
    } finally {
        client.release();
    }
});


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