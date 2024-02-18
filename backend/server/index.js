const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;

// ----------------------------------------
// MIDDLEWARE
// ----------------------------------------
app.use(cors()); // cors allows multiple ports running at once
app.use(express.json()); // by using express.json we're able to access req.body

// ----------------------------------------
// ROUTES
// ----------------------------------------
// add task
app.post('/tasks', async (req, res) => {
    try {
        const { text, status_id, board_id } = req.body;
        const newTask = await pool.query(
            "INSERT INTO tasks (text, status_id, board_id) VALUES($1, $2, $3)",
            [text, status_id, board_id]
        );
        res.json(newTask);
    } catch (err) {
        console.error(err.message);
    }
})

// add board

// Note:
// server needs to be started after routes defined because
// this file is executed in order
// start the server
app.listen(port, () => {
    console.log(`server has started on port ${port}...`);
});
