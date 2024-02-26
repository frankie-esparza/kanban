import React, { createContext, useState } from 'react';
import { getTableNameFromItemType } from '../helpers/helpers'
import axios from 'axios';

export const KanbanContext = createContext();

// Create instance of axios
const port = 5000;

export const axiosKanban = axios.create({
    baseURL: `http://localhost:${port}/`,
    timeout: 1000
});

export function KanbanProvider(props) {
    const [statuses, setStatuses] = useState([]);
    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);

    // Helper Function that updates the slice of state corresponding to 'itemType'
    const updateContext = (itemType, data) => {
        switch (itemType) {
            case 'status': setStatuses(data); break;
            case 'board': setBoards(data); break;
            case 'task': setTasks(data); break;
            case 'subtask': setSubtasks(data); break;
            default: return null;
        }
    }

    // GET
    const getItems = async (itemType) => {
        const tableName = getTableNameFromItemType(itemType);
        axiosKanban
            .get(`${tableName}`)
            .then((res) => updateContext(itemType, res.data))
            .catch((err) => console.error(err.message))
    }

    const getAllItems = async () => {
        const allItems = ['status', 'board', 'task', 'subtask'];
        allItems.forEach(item => getItems(item));
    }

    // EDIT
    const editItem = async (itemType, id, newItemData) => {
        const tableName = getTableNameFromItemType(itemType);
        axiosKanban
            .patch(`${tableName}/${id}`, newItemData)
            .then((res) => getAllItems())
            .catch((err) => console.error(err.message))
    }

    // ADD
    const addItem = async (itemType, newItemData) => {
        const tableName = getTableNameFromItemType(itemType);
        axiosKanban
            .post(`${tableName}`, newItemData)
            .then((res) => getAllItems())
            .catch((err) => console.error(err.message))
    }

    // DELETE
    const deleteItem = async (itemType, id) => {
        const tableName = getTableNameFromItemType(itemType);
        axiosKanban
            .delete(`${tableName}/${id}`)
            .then((res) => getAllItems())
            .catch((err) => console.error(err.message))
    }

    return (
        <KanbanContext.Provider
            value={{
                statuses,
                boards,
                tasks,
                subtasks,
                getItems,
                getAllItems,
                editItem,
                addItem,
                deleteItem
            }}
        >
            {props.children}
        </KanbanContext.Provider>
    )
}
