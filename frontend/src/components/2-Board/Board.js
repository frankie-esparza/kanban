import { useContext, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { KanbanContext } from '../../contexts/KanbanContext.js';
import StatusColumn from '../4-StatusColumn/StatusColumn.js';
import NavTop from '../3-Navs/NavTop.js';
import NavLeft from '../3-Navs/NavLeft.js';

function Board({ board }) {
    const { statuses, getAllItems } = useContext(KanbanContext);

    // useEffect(() => {
    //     console.log('GET ALL ITEMS called from board')
    //     getAllItems()
    // }, []
    // );

    // Styles
    const stylesLeft = { display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'baseline' };
    const stylesNavLeft = { width: '10%', minWidth: 230, height: '100%', bgcolor: 'background.secondary' };
    const stylesCenter = { width: '90%', bgcolor: 'background.primary', minWidth: 200 };
    const stylesNavTop = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.secondary' };
    const stylesBoardsArea = { display: 'flex', flexDirection: 'row', padding: 4 };
    const stylesBoard = { width: 300, minWidth: 300 };
    const stylesAddStatusButton = { marginTop: 2 };

    const navLeft = (
        <Box
            sx={stylesNavLeft} >
            <NavLeft />
        </Box>
    );

    const navTop = (
        <Box sx={stylesNavTop} >
            <NavTop board={board} />
        </Box>
    );

    const statusColumns = (
        statuses.map(status =>
            <Box key={status.id} className='top' sx={stylesBoard}>
                <StatusColumn board={board} status={status} />
            </Box>
        )
    );

    const kanbanArea = (
        <Box sx={stylesBoardsArea}>
            {statusColumns}
            <Box sx={stylesAddStatusButton} >
            </Box>
        </Box>
    );

    return (
        board &&
        <Paper>
            <Box sx={stylesLeft} >
                {navLeft}
                <Box className='center' sx={stylesCenter}>
                    {navTop}
                    {kanbanArea}
                </Box>
            </Box>
        </Paper>
    );
}

export default memo(Board);
