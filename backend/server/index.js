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
const getColNamesString = (colNames) => {
    return '(' + colNames.join(', ') + ')';
}

const getColValuesString = (colNames) => {
    const numsArray = colNames.map((col, index) => '$' + String(index + 1));
    return 'VALUES' + '(' + numsArray.join(', ') + ')';
}

const getWhereString = (queryParams) => {
    if (!queryParams) return null;

    let whereString = 'WHERE ';
    const colNames = Object.keys(queryParams);

    colNames.forEach((colName, index) => {
        if (index !== 0) whereString += 'AND '
        whereString += (colName + ' = $' + String(index + 1) + ' ');
    });
    return whereString;
}

// ----------------------------------------
// ROUTES
//
// 'tableName' below refers to the name of the table in the PostgresSQL database
//    e.g. statuses, boards, tasks or subtasks
//
// 'item' below refers to a row of a table, e.g. status, board, task, or sutbask
//
// ----------------------------------------

// ADD an item
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

// GET an item by id
app.get('/:tableName/:id', async (req, res) => {
    try {
        const { tableName, id } = req.params;
        const row = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
        res.json(row.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// GET ALL of a particular item
// and if there are query parameters present, apply those filters to the get request
//    e.g. /tasks?board_id=123&status=567 should return all tasks from board '123' with status '567'
app.get('/:tableName', async (req, res) => {
    try {
        const { tableName } = req.params;
        const queryParams = req.query;
        const whereString = getWhereString(queryParams);

        const allRows = await pool.query(
            `SELECT * FROM ${tableName} ${whereString}`,
            Object.values(queryParams)
        );
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
