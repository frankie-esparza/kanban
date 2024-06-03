# Kanban Fullstack App
Welcome to the Kanban task management app! 
- this app is built using the PERN stack (PostgresQL, Express, React & Node.js) & Material UI
- What's Kanban? Learn more about it here - https://en.wikipedia.org/wiki/Kanban_(development)

## Overview
Using the App:
- The app contains **Boards** which each contain three **Status Columns** - Todo, Doing, and Done
- each **Status Column** contains **Tasks**
- each **Task** may contain **Subtasks**
  
<img width="1000" alt="home" src="https://github.com/fwesparza/kanban/assets/17794659/d826f46b-e543-4fa2-9d14-6a568f07d8b9">
<img width="1000" alt="form" src="https://github.com/fwesparza/kanban/assets/17794659/31b6f472-1b2b-4186-8f68-d23baf5f6f76">
<img width="1000" alt="darkMode" src="https://github.com/fwesparza/kanban/assets/17794659/d1d272ff-96f5-45ea-a056-bce77694c299">



## Notes on the Code:

### Database, Context & State Management
- all data related to **Statuses**, **Boards**, **Tasks**, & **Subtasks** is stored in a PostgresQL database
- the current dark/light mode setting is being stored in local storage
- once data is fetched from the database it is stored in a React Context called **KanbanContext** which contains
  several slices of state and functions used throughout the components
- most fetch calls are made in **KanbanContext** but some are made directly in components in the case where a subset
  of the data is being fetched but not stored directly in the database (e.g. which tasks belong to a specific board
  and have the status 'Todo')

### Components
- the folder '0-subcomponents' contains components that are used in other components
- the **Item** component is used to create both **Tasks** & **Subtasks**
- wherever possible, state is managed in higher-order components & needed props are passed to children (e.g. the **Item**
  component contains state that is relevant to the **ItemCard** & **EditDialog**)


## Setup

### Set up PostgresQL
1. Download PostgresQL [here](https://www.postgresql.org/download/)
2. Start PostgresQL on your computer
3. Open PostgresQL
4. Open **Preferences...**
5. Uncheck **Ask for permission when apps open without passsword**

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
5. ```CREATE DATABASE kanban;``` to create a database called kanban
6. ```\c kanban``` to connect to kanban database
7. ```\i 0_reset.sql```  to reset the database -
this command runs 4 sql files that create tables in the database
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


## Future Improvements
1. **Increase speed** - currently some components render more times than they need to
2. **Add tests** - using mocha & chai
3. **Add helpful error messages** to the user for invalid data or actions.
4. **Authentication**
5. **Clean up the CSS** & use Material UI styled components
6. Change Subtask status from Todo, Doing, Done to checkboxes
