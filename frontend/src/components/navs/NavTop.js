import { memo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function NavTop({ board }) {
    const stylesAddTaskButton = { marginLeft: 4, marginTop: 4 };

    const addTaskButton = (
        <Box sx={stylesAddTaskButton}>
            <Button>Add Task</Button>
        </Box>
    );

    return (
        <>
            <h1>{board.text}</h1>
            {addTaskButton}
        </>
    );
}

export default memo(NavTop);
