import { useContext, useState, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import { fetchWrapper } from '../helpers/fetchHelpers.js';
import { KanbanContext } from '../contexts/KanbanContext.js';
import Task from './Task.js';

function StatusColumn({ board, status }) {
    const port = 5000;
    const { tasks } = useContext(KanbanContext);
    const [tasksShown, setTasksShown] = useState([]);

    // NOTE:
    // useEffect is supposed to return a function, so it's first argument must be a regular callback
    // because of this, we can't have the first arg of useEffect be an async function, because then it would
    // return a Promise. To work around this we define an async function for the fetch request inside the
    // useEffect and then call it
    useEffect(() => {
        const getTasksForBoardAndStatus = async (boardId, statusId) => {
            const res = await fetch(`http://localhost:${port}/tasks?board_id=${boardId}&status_id=${statusId}`);
            const tasks = await res.json();
            setTasksShown(tasks);
        }

        fetchWrapper(() => getTasksForBoardAndStatus(board.id, status.id));
    }, [board.id, status.id, tasks])

    const stylesTask = { padding: 1 };

    return (
        <>
            <h2>{status.text}</h2>
            {tasksShown.length > 0 && tasksShown.map(
                task =>
                    <Box key={task.id} sx={stylesTask}>
                        <Task task={task} />
                    </Box>

            )}
        </>
    )
}

export default memo(StatusColumn);
