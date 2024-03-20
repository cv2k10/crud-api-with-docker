const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // for parsing application/json

const pool = require('./db');

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// POST /setup for creating create a table in PostgreSQL with id, name, and address fields
app.post('/setup', async (req, res) => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL
    )
    `);
    res.status(200).send({message: "Successully created table"});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

