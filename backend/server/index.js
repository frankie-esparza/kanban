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
const getArrayOfVars = (obj) => Object.keys(obj).map((key, i) => '$' + `${i + 1}`);
const getArrayOfKeyValuePairStrings = (obj) => Object.keys(obj).map(key => `${key} = ${obj[key]}`);

const getStringOfValues = (arr) => arr.join(', ')
const getStringOfKeyValuePairs = (obj) => getStringOfValues(getArrayOfKeyValuePairStrings(obj));

// wrapper function to wrap all queries in try-catch error block
const queryWrapper = (queryFunc) => {
    return async (req, res) => {
        try {
            let result = await queryFunc(req, res);
            res.json(result);
        } catch (err) {
            console.error(err.message);
        }
    }
}

const postFunc = async (req, res) => {
    const { tableName } = req.params;
    const body = req.body;
    const stringOfKeys = getStringOfValues(Object.keys(body));
    const stringOfVars = getStringOfValues(getArrayOfVars(body));
    const arrayOfValues = Object.values(body);
    return await pool.query(`INSERT INTO ${tableName} (${stringOfKeys}) VALUES (${stringOfVars})`, arrayOfValues);
}

const patchFunc = async (req, res) => {

}

// ----------------------------------------
// ROUTES
// ----------------------------------------
// ADD an item
app.post('/:tableName', queryWrapper(postFunc));

// ----------------------------------------
//
// TODO
// - update rest of routes to use the wrapper
// - split routes file into multiple routes?
//
// ----------------------------------------


// EDIT an item by id
app.patch('/:tableName/:id', async (req, res) => {
    try {
        const { tableName, id } = req.params;
        const stringOfKeyValuePairs = getStringOfKeyValuePairs(req.body);
        const result = await pool.query(`
            UPDATE ${tableName}
            SET ${stringOfKeyValuePairs}
            WHERE id = ${id}`
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})

// GET an item by id
app.get('/:tableName/:id', async (req, res) => {
    try {
        const { tableName, id } = req.params;
        const result = await pool.query(`
            SELECT * FROM ${tableName}
            WHERE id = ${id}`
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})

// GET ALL of a particular item & if there are query params, use them to filter data
//    e.g. /tasks?board_id=123&status=567 should return all tasks from board '123' with status '567'
app.get('/:tableName', async (req, res) => {
    try {
        const { tableName } = req.params;
        const stringOfKeyValuePairs = getStringOfKeyValuePairs(req.query);
        const result = await pool.query(`
            SELECT * FROM ${tableName}
            WHERE ${stringOfKeyValuePairs}`
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})

// DELETE an item by id
// Note: see the create tables commands in the 'database' folder for details on ON DELETE constraints
app.delete('/:tableName/:id', async (req, res) => {
    try {
        const { tableName, id } = req.params;
        await pool.query(`
            DELETE FROM ${tableName}
            WHERE id = ${id}`
        );
        res.json(`The item was successfully deleted`);
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
