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
// ADD ROUTES
// ----------------------------------------
// Add status, board, task, or subtask
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

// Start server
app.listen(port, () => {
    console.log(`server has started on port ${port}...`);
});
