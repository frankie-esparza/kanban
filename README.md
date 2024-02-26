# Kanban App

## Setup

### Download PostgresQL
https://www.postgresql.org/download/

### Helpful commands for PostgresQL & psql:
- psql - starts up psql (the command line interface to PostgresQL)
- \q exit
- \h gives list of SQL commands
- \? gives list of psql commands
- don't forget semicolons at the end of any SQL commands

### Set up the backend:
1. Start PostgresQL on your computer
2. Adjust settings so password not needed to connec to databases
3. cd into 'backend/server'
4. npm install
5. cd into 'backend/database'
6. psql                    //  starts PostgresQL in your terminal
7. CREATE DATABASE kanban; //  create a database called kanban
8. \c kanban               //  connect to kanban database
9. \i 0_reset.sql          //  this file runs 4 sql files that create tables in the database
                           //   & seed the starter data for statuses, boards, tasks & subtasks
10. Note: to reset the database at anytime just re-run \i 0_reset.sql

### Set up the frontend:
1. cd into 'frontend'
2. npm install

## Running the App

### Start the frontend:
1. open a terminal
2. cd into 'frontend'
3. run npm start

### Start the backend:
1. open another terminal
2. cd into 'backend/server'
3. run nodemon index.js
