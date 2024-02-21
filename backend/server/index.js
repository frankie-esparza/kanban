const express = require('express');
const cors = require('cors');
const pool = require('./db');
const {
    getValues,
    getVarsJoinedByCommas,
    getKeysJoinedByCommas,
    getKeyValuePairsJoinedByCommas,
    getKeyValuePairsJoinedByAnds,
    queryWrapper
} = require('./helpers');

const app = express();
const port = 5000;

// ----------------------------------------
// MIDDLEWARE
// ----------------------------------------
app.use(cors());         // cors allows multiple ports running at once
app.use(express.json()); // by using express.json we're able to access req.body

// -----------------------------------------------------------------
// ROUTES
// - 'item' below refers to a subtask, board, task, or subtask
// - 'tableName' refers to the name of the table in the database (subtasks, boards, tasks & subtasks)
// -----------------------------------------------------------------
// GET an item
const getByIdFunc = async (tableName, id, queries, body) => {
    return await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
}

// GET all of an item & apply filters using the query params in req.query
// e.g. /tasks?board_id=123&status_id=567 should return all tasks from board '123' with status '567'
const getAllFunc = async (tableName, id, queries, body) => {
    const values = getValues(queries);
    const keyValuePairs = getKeyValuePairsJoinedByAnds(queries);
    return await pool.query(`SELECT * FROM ${tableName} ${(!keyValuePairs) ? '' : `WHERE ${keyValuePairs}`}`, values);
}

// ADD an item
const postFunc = async (tableName, id, queries, body) => {
    const values = getValues(body);
    const keys = getKeysJoinedByCommas(body);
    const vars = getVarsJoinedByCommas(body);
    return await pool.query(`INSERT INTO ${tableName} (${keys}) VALUES (${vars})`, values);
}

// EDIT an item
const patchFunc = async (tableName, id, queries, body) => {
    const values = getValues(body);
    const keyValuePairs = getKeyValuePairsJoinedByCommas(body);
    return await pool.query(`UPDATE ${tableName} SET ${keyValuePairs} WHERE id = $${values.length + 1}`, [...values, id]);
}

// DELETE an item
const deleteFunc = async (tableName, id, queries, body) => {
    return await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
}

app.get('/:tableName/:id', queryWrapper(getByIdFunc));
app.get('/:tableName', queryWrapper(getAllFunc));
app.patch('/:tableName/:id', queryWrapper(patchFunc));
app.post('/:tableName', queryWrapper(postFunc));
app.delete('/:tableName/:id', queryWrapper(deleteFunc));

// ----------------------------------------
// START SERVER
// ----------------------------------------
app.listen(port, () => {
    console.log(`server has started on port ${port}...`);
});
