import React, { createContext, useState } from 'react';
import { getTableNameFromItemType } from '../helpers/helpers'
import axios from "axios";

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
        const res = await fetch(`http://localhost:${port}/${tableName}`);
        const items = await res.json();
        updateContext(itemType, items);
    }

    // EDIT
    const editItem = async (itemType, id, newItemData) => {
        const tableName = getTableNameFromItemType(itemType);
        axios
            .patch(`http://localhost:${port}/${tableName}/${id}`, newItemData)
            .then((res) => getItems('task'))
            .catch((err) => console.error(err.message))
    }

    // DELETE
    const deleteItem = async (itemType, id) => {
        const tableName = getTableNameFromItemType(itemType);
        axios
            .delete(`http://localhost:${port}/${tableName}/${id}`)
            .then((res) => getItems('task'))
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
                editItem,
                deleteItem
            }}
        >
            {props.children}
        </KanbanContext.Provider>
    )
}
