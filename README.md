# Kanban App
Welcome to the Kanban task management app! 👋🏽 🌊
- This app uses the kanban method to visually organize tasks.
- Tasks are added to 'Boards' which contain 3 status columns, 'Todo', 'Doing', and 'Done'.
- A task may contain subtasks.
- Learn more about the kanban method here - https://en.wikipedia.org/wiki/Kanban_(development)

## Setup

### Set up PostgresQL
1. Download PostgresQL here - https://www.postgresql.org/download/
2. Start PostgresQL on your computer
3. Open PostgresQL
4. Open 'Preferences...'
5. Uncheck 'Ask for permission when apps open without passsword'

### Helpful commands for PostgresQL & psql:
- ```psql``` - starts up psql (the command line interface to PostgresQL)
- ```\q``` exit
- ```\h``` gives list of SQL commands
- ```\?``` gives list of psql commands
- don't forget semicolons at the end of any SQL commands

### Set up the backend:
1. ```cd backend```
2. ```npm install```
3. ```cd backend/database```
4. ```psql``` to start PostgresQL in your terminal
5. ```CREATE DATABASE kanban;``` tocreate a database called kanban
6. ```\c kanban``` to connect to kanban database
7. ```\i 0_reset.sql```  to reset the database -
this comamnd runs 4 sql files that create tables in the database
and seed the starter data for statuses, boards, tasks & subtasks
8. Note: to reset the database at anytime just re-run ```\i 0_reset.sql```

### Set up the frontend:
1. ```cd frontend```
2. ```npm install```

## Running the App

### Start the frontend:
1. ```cd frontend```
2. ```npm start```

### Start the backend:
1. ```cd backend/server```
2. ```nodemon index.js```
