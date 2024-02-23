import { memo } from 'react';
import Box from '@mui/material/Box';

import AddButton from '../0-subcomponents/AddButton';

function NavTop({ board }) {
    const stylesAddTaskButton = { marginRight: 4 };

    const addTaskButton = (
        <Box sx={stylesAddTaskButton}>
            <AddButton itemType='task' />
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
