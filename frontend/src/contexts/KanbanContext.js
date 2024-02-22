import React, { createContext, useState } from 'react';
import { getTableNameFromItemType } from '../helpers/helpers'

export const KanbanContext = createContext();

export function KanbanProvider(props) {
    const port = 5000;
    const [statuses, setStatuses] = useState([]);
    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);

    // HELPERS
    const updateState = (itemType, data) => {
        console.log('state updated')
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
        updateState(itemType, items);
    }

    // const getTasksForBoardAndStatus = async (boardId, statusId) => {
    //     const res = await fetch(`http://localhost:${port}/tasks?board_id=${boardId}&status_id=${statusId}`);
    //     const tasks = await res.json();
    //     return tasks;
    // }

    // const getSubtasksForTask = async (taskId) => {
    //     const res = await fetch(`http://localhost:${port}/subtasks?task_id=${taskId}`);
    //     const subtasks = await res.json();
    //     return subtasks;
    // }

    // const getItemById = async (itemType, id) => {
    //     const tableName = getTableNameFromItemType(itemType);
    //     const res = await fetch(`http://localhost:${port}/${tableName}/${id}`);
    //     const item = await res.json();
    //     return item;
    // }

    // ADD
    const addItem = async (itemType, newItemData) => {
        const tableName = getTableNameFromItemType(itemType);
        const res = await fetch(`http://localhost:${port}/${tableName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "body": JSON.stringify(newItemData)
                }
            });
        const newItem = await res.json();

        const oldItems = getItems(itemType);
        const newItems = [...oldItems, newItem];
        updateState(itemType, newItems);
    }

    // EDIT
    const editItem = async (itemType, id, newItemData) => {
        const tableName = getTableNameFromItemType(itemType);
        const res = await fetch(`http://localhost:${port}/${tableName}/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "body": JSON.stringify(newItemData)
                }
            });
        const newItem = await res.json();

        const oldItems = getItems(itemType);
        const newItems = oldItems.map(item => (item.id === id ? newItem : item));
        updateState(itemType, newItems);
    }

    // DELETE
    const deleteItem = async (itemType, id) => {
        const tableName = getTableNameFromItemType(itemType);
        fetch(`http://localhost:${port}/${tableName}/${id}`,
            { method: "DELETE" });

        const oldItems = getItems(itemType);
        const newItems = oldItems.filter(item => item.id !== id);
        updateState(itemType, newItems);
    }

    return (
        <KanbanContext.Provider value={{
            statuses,
            boards,
            tasks,
            subtasks,
            getItems,
            addItem,
            editItem,
            deleteItem
        }}>
            {props.children}
        </KanbanContext.Provider>
    )
}
