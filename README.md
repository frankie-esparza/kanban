# Kanban App

## Setup

### Set up the backend:
1. cd into 'server' folder
2. npm install
3. cd into 'database' folder
4. download PostgresQL here - https://www.postgresql.org/download/
5. Start PostgresQL on your computer

### Helpful commands for PostgresQL & psql:
- psql - starts up psql (the command line interface to PostgresQL)
- \q exit
- \h gives list of SQL commands
- \? gives list of psql commands


### Open up PostgresQL and run the following commands:
4. cd into 'database' folder
5. psql                    //  starts PostgresQL in your terminal
6. CREATE DATABASE kanban; //  create a database called kanban
7. \c kanban;              //  connect to kanban database
8. \i 0_reset.sql          //  this file runs 4 sql files that create tables in the database
                           //   & seed the starter data for statuses, boards, tasks & subtasks
9. Note: to reset the database at anytime just re-run \i 0_reset.sql


### Set up the frontend:
1. cd frontend
2. npm install

## Running the App

### Start the frontend:
1. open a terminals
2. cd into 'frontend'
3. run npm start

### Start the backend:
1. open another termianl
2. cd into 'backend/server' folder
3. run nodemon index.js
