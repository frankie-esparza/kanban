import React, { useContext, useEffect, memo } from 'react';
import { KanbanContext } from '../../contexts/KanbanContext';
import { useLocation } from "react-router-dom";
import { convertToKebabCase, convertFromKebabCase } from '../../helpers/helpers.js';
import { v4 as uuidv4 } from 'uuid';
import LabeledSwitch from './LabeledSwitch.js';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { fetchWrapper } from '../../helpers/fetchHelpers.js';
import { port } from '../KanbanApp.js';

function NavLeft({ darkMode, setDarkMode }) {
    // Context
    const { boards, setBoards } = useContext(KanbanContext);

    // Get Current Board
    const location = useLocation().pathname.split('/')[1];
    const currentBoard = convertFromKebabCase(location);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }

    // styles
    const stylesNavLeft = { height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
    const stylesTitleSection = { marginTop: 1.5 };
    const stylesKanbanLogo = { paddingInline: 3 };
    const stylesBoardsList = { marginTop: 5.5 };
    const stylesBoardLink = { display: 'flex', flexDirection: 'row', alignItems: 'center', paddingInline: 2 };
    const stylesDashboardIcon = { paddingInline: 1 };
    const stylesAddBoardButton = { marginLeft: 4, marginTop: 4 };
    const stylesDarkModeSwitch = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 };

    return (
        <Box sx={stylesNavLeft}>
            {/* TITLE */}
            <Box sx={stylesTitleSection}>
                <Box sx={stylesKanbanLogo}>
                    <h1>kanban</h1>
                </Box>

                {/* LIST OF BOARD LINKS */}
                <Box sx={stylesBoardsList}>
                    {boards.map(board =>
                        <Box
                            key={uuidv4()}
                            sx={{ bgcolor: ((board.text === currentBoard) ? 'background.active' : 'background.secondary'), paddingBlock: 1 }}>
                            <Box sx={stylesBoardLink}>
                                <Box sx={stylesDashboardIcon}>
                                    <DashboardIcon />
                                </Box>
                                <Link
                                    href={`/${convertToKebabCase(board.text)}`}
                                    underline="none"
                                    sx={{ color: 'text.primary' }}
                                >
                                    {board.text}
                                </Link>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/*  ADD BOARD BUTTON */}
                <Box sx={stylesAddBoardButton}>
                    {/* <Form formType='ADD' itemType='board' /> */}
                </Box>

                {/*  DARK MODE SWITCH */}
                <Box sx={stylesDarkModeSwitch}>
                    <LabeledSwitch handleChange={toggleTheme} checked={darkMode} />
                </Box>
            </Box>
        </Box>
    );
}

export default memo(NavLeft);
