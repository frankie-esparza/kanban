import React, { createContext, useState } from 'react';
import { getTableNameFromItemType } from '../helpers/helpers'
import axios from 'axios';

export const KanbanContext = createContext();

export function KanbanProvider(props) {
    const port = 5000;
    const [statuses, setStatuses] = useState([]);
    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);

    // -----------
    // HELPERS
    // ------------
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
        axios
            .get(`http://localhost:${port}/${tableName}`)
            .then((res) => updateContext(itemType, res.data))
            .catch((err) => console.error(err.message))
    }

    const getAllItems = async (itemType) => {
        const allItems = ['status', 'board', 'task', 'subtask'];
        allItems.forEach(item => getItems(item));
    }

    // EDIT
    const editItem = async (itemType, id, newItemData) => {
        const tableName = getTableNameFromItemType(itemType);
        axios
            .patch(`http://localhost:${port}/${tableName}/${id}`, newItemData)
            .then((res) => getAllItems())
            .catch((err) => console.error(err.message))
    }

    // ADD
    const addItem = async (itemType, newItemData) => {
        console.log('post request made')
        const tableName = getTableNameFromItemType(itemType);
        axios
            .post(`http://localhost:${port}/${tableName}`, newItemData)
            .then((res) => getAllItems())
            .catch((err) => console.error(err.message))
    }

    // DELETE
    const deleteItem = async (itemType, id) => {
        const tableName = getTableNameFromItemType(itemType);
        axios
            .delete(`http://localhost:${port}/${tableName}/${id}`)
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
