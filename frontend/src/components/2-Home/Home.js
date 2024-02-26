import { memo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NavLeft from '../3-Navs/NavLeft.js';

function Home() {
    // Styles
    const stylesLeft = { display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'baseline' };
    const stylesNavLeft = { width: '10%', minWidth: 230, height: '100%', bgcolor: 'background.secondary' };
    const stylesWelcomeMessage = { display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', alignItems: 'center', marginTop: 20 };

    const navLeft = (
        <Box
            sx={stylesNavLeft} >
            <NavLeft />
        </Box>
    );

    const welcomeMessage = (
        <Box
            sx={stylesWelcomeMessage} >
            <h1>Welcome to the Kanban App! </h1>
            <p>Click a board to get started.</p>

        </Box>
    );

    return (
        <Paper>
            <Box sx={stylesLeft} >
                {navLeft}
                {welcomeMessage}
            </Box>
        </Paper>
    );
}

export default memo(Home);
