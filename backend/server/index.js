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
// HELPERS
// ----------------------------------------
const getColNamesString = (array) => {
    return '(' + array.join(', ') + ')';
}

const getColValuesString = (array) => {
    const numsArray = array.map((col, index) => '$' + String(index + 1));
    return 'VALUES' + '(' + numsArray.join(', ') + ')';
}

// ----------------------------------------
// ROUTES
// ----------------------------------------
// ADD status, board, task, or subtask
app.post('/:tableName', async (req, res) => {
    try {
        // Get array of columns
        const { tableName } = req.params;
        const cols = await pool.query(`SELECT * FROM ${tableName}`); // get array of column names
        const colNamesArray = cols.fields.map(col => col.name); // use the node-pg library built-in props .fields & .name
        colNamesArray.shift(); // remove the 'id' column since it's auto-generated

        // Convert column names (colNamesArray) into strings needed for query
        const colNamesString = getColNamesString(colNamesArray);
        const colValuesString = getColValuesString(colNamesArray);

        // Add new status, board, task or subtask to database
        const newRow = await pool.query(
            `INSERT INTO ${tableName} ${colNamesString} ${colValuesString}`,
            Object.values(req.body)
        );
        res.json(newRow);
    } catch (err) {
        console.error(err.message);
    }
})

// GET status, board, task, or subtask
app.get('/:tableName/:id', async (req, res) => {
    try {
        const { tableName, id } = req.params;
        console.log('id', id);
        const row = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
        res.json(row.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// GET ALL statuses, boards, tasks, or subtasks
app.get('/:tableName', async (req, res) => {
    try {
        const { tableName } = req.params;
        const allRows = await pool.query(`SELECT * FROM ${tableName}`);
        res.json(allRows.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// ----------------------------------------
// START SERVER
// ----------------------------------------
app.listen(port, () => {
    console.log(`server has started on port ${port}...`);
});
