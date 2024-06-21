# Kanban
Kanban is a full-stack task management app built with React, Express, PostgreSQL, Express, Node.js and Material UI. [What's Kanban?](https://en.wikipedia.org/wiki/Kanban_(development))

## Features
- 📂 Create Boards representing different projects or scopes of work
- ✅ Create tasks & assign sub-tasks 
- 🎉 Mark tasks as in-progress or done 

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
