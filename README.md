# Kanban
A full stack kanban-style task management app built with React Context & Hooks, Node.js, Express, PostgreSQL, and Material UI. 

## Features
### Add Tasks
<img src="https://storage.googleapis.com/frankie-esparza-portfolio/gifs/kanban-1.gif" width="800">
<br></br>

### Update Status
<img src="https://storage.googleapis.com/frankie-esparza-portfolio/gifs/kanban-2.gif" width="800">
<br></br>

### Add Subtasks
<img src="https://storage.googleapis.com/frankie-esparza-portfolio/gifs/kanban-3.gif" width="800">
<br></br>

### Dark Mode
<img src="https://storage.googleapis.com/frankie-esparza-portfolio/gifs/kanban-4.gif" width="800">
<br></br>

## Setup
1. Install dependencies for the Back End:
```
cd backend
npm install 
```
2. Setup the Database:
```sql
cd backend
cd databae
psql
CREATE DATABASE kanban;
\c kanban
\i 0_reset.sql
```
3. Install dependencies for the Front End:
```
cd frontend
npm install
```
4. Start the Front End:
```
cd frontend
npm start
```
5. Start the Back End:
```
cd backend/server
nodemon index.js
```
