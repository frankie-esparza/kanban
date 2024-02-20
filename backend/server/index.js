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
const getVars = (obj) => Object.keys(obj).map((key, i) => '$' + `${i + 1}`);

const getKeyValuePairs = (obj) => {
    const vars = getVars(obj);
    const keys = Object.keys(obj);
    return keys.map((key, i) => `${key} = ${vars[i]}`)
}

const joinByComma = (arr) => arr.join(', ');
const joinByAnd = (arr) => arr.join(' AND ');

const getValues = (obj) => Object.values(obj);

const getVarsJoinedByCommas = (obj) => joinByComma(getVars(obj));
const getKeysJoinedByCommas = (obj) => joinByComma(Object.keys(obj));
const getValuesJoinedByCommas = (obj) => joinByComma(Object.values(obj));

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
            let result = await queryFunc(req, res);
            (result.command === "DELETE") ? res.json('Item was successfully deleted') : res.json(result.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
}

// ADD an item
const postFunc = async (req) => {
    const { tableName } = req.params;
    const body = req.body;
    const keys = getKeysJoinedByCommas(body);
    const values = getValues(body);
    const vars = getVarsJoinedByCommas(body);

    return await pool.query(`
        INSERT INTO ${tableName} (${keys})
        VALUES (${vars})`,
        values
    );
}

// EDIT an item
const patchFunc = async (req) => {
    const { tableName, id } = req.params;
    const body = req.body;
    const values = getValues(body);
    const numProps = values.length;
    const keyValuePairs = getKeyValuePairsJoinedByCommas(body);

    return await pool.query(`
        UPDATE ${tableName}
        SET ${keyValuePairs}
        WHERE id = $${numProps + 1}`,
        [...values, id]
    );
}

// GET an item
const getByIdFunc = async (req) => {
    const { tableName, id } = req.params;
    return await pool.query(`
        SELECT * FROM ${tableName}
        WHERE id = $1`,
        [id]
    );
}

// GET all of an item & apply filters using the query params in req.query
const getAllFunc = async (req) => {
    const { tableName } = req.params;
    const queries = req.query;
    const keyValuePairs = getKeyValuePairsJoinedByAnds(queries);
    const values = getValues(queries);
    return await pool.query(`
        SELECT * FROM ${tableName}
        ${(!keyValuePairs) ? '' : `WHERE ${keyValuePairs}`}`,
        values
    );
}

// DELETE an item
const deleteFunc = async (req) => {
    const { tableName, id } = req.params;
    await pool.query(`
        DELETE FROM ${tableName}
        WHERE id = $1`,
        [id]
    );
}

// 'tableName' refers to the name of the table in the database
// the tables are: subtasks, boards, tasks & subtasks
app.post('/:tableName', queryWrapper(postFunc));
app.patch('/:tableName/:id', queryWrapper(patchFunc));

app.get('/:tableName/:id', queryWrapper(getByIdFunc));
app.get('/:tableName', queryWrapper(getAllFunc));

app.delete('/:tableName/:id', queryWrapper(deleteFunc));

// ----------------------------------------
// START SERVER
// ----------------------------------------
app.listen(port, () => {
    console.log(`server has started on port ${port}...`);
});
