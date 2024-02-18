// Purpose of this file:
// sets up the connection between the database
// and the server useing the pg library built into node

// Note:
// need to use this syntax instead of import because
// we're outside a module (not in a component)
// i.e. this doesn't work - import { Pool } from 'pg';
const Pool = require("pg").Pool;


// QUESTION
// seems like this port needs to be seperate from the server
// port whis is 5000 - why is this?
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'kanban'
    // Note:
    // Postgress.app set to not require username and password
    // username: 'postgres',
    // password: 'postgres123',
});

module.exports = pool;
