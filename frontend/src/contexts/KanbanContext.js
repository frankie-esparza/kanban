import React, { createContext } from 'react';
import KanbanReducer from '../reducers/KanbanReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';
import { v4 as uuidv4 } from 'uuid';

// to prevent all tasks form re-rendering everytime a single task is updated,
// we create 2 separate contexts, one for tasks & one for the actions
export const KanbanContext = createContext();
export const KanbanDispatchContext = createContext();

export function KanbanProvider(props) {
    let numItems = 18; // num starter boards, tasks, subtasks & statuses
    let ids = [];
    for (let i = 0; i < numItems; i++) {
        ids.push(uuidv4());
    }

    let kanban = {
        boards: [
            { id: ids[0], itemType: "board", text: "Product Launch" },
            { id: ids[1], itemType: "board", text: "Marketing Strategy" },
            { id: ids[2], itemType: "board", text: "Roadmap" },
        ],
        tasks: [
            { id: ids[3], itemType: "task", text: "Swim with Whales", status: ids[15], parentId: ids[0] },
            { id: ids[4], itemType: "task", text: "Dive with Nudibranchs", status: ids[16], parentId: ids[0] },
            { id: ids[5], itemType: "task", text: "Sea Seahorses", status: ids[17], parentId: ids[0] },
            { id: ids[6], itemType: "task", text: "Swim with Sharks", status: ids[15], parentId: ids[1] },
            { id: ids[7], itemType: "task", text: "Swim with Whale Sharks", status: ids[15], parentId: ids[1] },
            { id: ids[8], itemType: "task", text: "Surf with Goober", status: ids[15], parentId: ids[2] }
        ],
        subtasks: [
            { id: ids[9], itemType: "subtask", text: "Follow whale migration route", status: ids[15], parentId: ids[3] },
            { id: ids[10], itemType: "subtask", text: "Play with baby whales", status: ids[15], parentId: ids[3] },
            { id: ids[11], itemType: "subtask", text: "Listen to Whale Songs", status: ids[15], parentId: ids[3] },
            { id: ids[12], itemType: "subtask", text: "Find nudibranchs", status: ids[15], parentId: ids[4] },
            { id: ids[13], itemType: "subtask", text: "Look for caves", status: ids[15], parentId: ids[4] },
            { id: ids[14], itemType: "subtask", text: "Find carniverous nudibranchs", status: ids[15], parentId: ids[4] }
        ],

        statuses: [
            { id: ids[15], itemType: "status", text: "Todo" },
            { id: ids[16], itemType: "status", text: "Doing" },
            { id: ids[17], itemType: "status", text: "Done" }
        ]
    }

    const [state, dispatch] = useLocalStorageReducer("kanban", kanban, KanbanReducer);

    return (
        <KanbanContext.Provider value={state}>
            <KanbanDispatchContext.Provider value={dispatch}>
                {props.children}
            </KanbanDispatchContext.Provider>
        </KanbanContext.Provider>
    )
}
