import { useContext, useState, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import { axiosKanban } from '../../contexts/KanbanContext.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';
import Task from '../5-Task/Task.js';

function StatusColumn({ board, status }) {
    const { tasks } = useContext(KanbanContext);
    const [tasksShown, setTasksShown] = useState([]);

    // Get Tasks for Each Status Column
    useEffect(() => {
        const getTasksForBoardAndStatus = async (boardId, statusId) => {
            axiosKanban
                .get(`tasks?board_id=${boardId}&status_id=${statusId}`)
                .then((res) => setTasksShown(res.data))
                .catch((err) => console.error(err.message))
        }

        getTasksForBoardAndStatus(board.id, status.id);
    }, [tasks, board.id, status.id])

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
