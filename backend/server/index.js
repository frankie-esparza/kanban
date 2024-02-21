const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;

// ----------------------------------------
// MIDDLEWARE
// ----------------------------------------
app.use(cors());         // cors allows multiple ports running at once
app.use(express.json()); // by using express.json we're able to access req.body

// ----------------------------------------
// HELPERS
// ----------------------------------------
const getVars = (obj) => obj ? Object.keys(obj).map((key, i) => '$' + `${i + 1}`) : null;
const getValues = (obj) => obj ? Object.values(obj) : null;

const getKeyValuePairs = (obj) => {
    if (!obj) return null;
    const vars = getVars(obj);
    const keys = Object.keys(obj);
    return keys.map((key, i) => `${key} = ${vars[i]}`)
}

const joinByComma = (arr) => arr ? arr.join(', ') : null;
const joinByAnd = (arr) => arr ? arr.join(' AND ') : null;

const getVarsJoinedByCommas = (obj) => joinByComma(getVars(obj));
const getKeysJoinedByCommas = (obj) => joinByComma(Object.keys(obj));

const getKeyValuePairsJoinedByCommas = (obj) => joinByComma((getKeyValuePairs(obj)));
const getKeyValuePairsJoinedByAnds = (obj) => joinByAnd(getKeyValuePairs(obj));

// -----------------------------------------------------------------
// ROUTES
//
// Note: 'item' below refers to a subtask, board, task, or subtask
// -----------------------------------------------------------------
//  Wrapper for all Routes
const queryWrapper = (queryFunc) => {
    return async (req, res) => {
        try {
            const tableName = req.params.tableName || null;
            const id = req.params.id || null;
            const queries = req.query || null;
            const body = req.body || null;
            let result = await queryFunc(tableName, id, queries, body);
            (result.command === 'DELETE') ? res.json('Item was successfully deleted') : res.json(result.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
}

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

// 'tableName' refers to the name of the table in the database (subtasks, boards, tasks & subtasks)
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
