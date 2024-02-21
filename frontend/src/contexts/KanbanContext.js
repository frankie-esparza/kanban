import React, { createContext, useState, useEffect } from 'react';
import { fetchWrapper } from '../helpers/fetchHelpers';


export const KanbanContext = createContext();

export function KanbanProvider(props) {
    const [statuses, setStatuses] = useState([]);
    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);

    return (
        <KanbanContext.Provider value=
            {{
                statuses,
                setStatuses,
                boards,
                setBoards,
                tasks,
                setTasks,
                subtasks,
                setSubtasks
            }}>
            {props.children}
        </KanbanContext.Provider>
    )
}
