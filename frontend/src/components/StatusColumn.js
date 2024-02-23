import { useContext, useState, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import { KanbanContext } from '../contexts/KanbanContext.js';
import Task from './Task.js';
import axios from 'axios';

function StatusColumn({ board, status }) {
    const port = 5000;
    const { tasks } = useContext(KanbanContext);
    const [tasksShown, setTasksShown] = useState([]);

    useEffect(() => {
        const getTasksForBoardAndStatus = async (boardId, statusId) => {
            axios
                .get(`http://localhost:${port}/tasks?board_id=${boardId}&status_id=${statusId}`)
                .then((res) => setTasksShown(res.data))
                .catch((err) => console.error(err.message))
        }

        getTasksForBoardAndStatus(board.id, status.id);
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
