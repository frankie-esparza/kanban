import React, { useContext, memo } from 'react';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { KanbanContext } from '../../contexts/KanbanContext.js';
import { ThemeContext } from '../../contexts/ThemeContext.js';
import { convertToKebabCase, convertFromKebabCase } from '../../helpers/helpers.js';
import LabeledSwitch from '../0-subcomponents/LabeledSwitch.js';
import AddButton from '../0-subcomponents/AddButton.js';


function NavLeft() {
    const { boards } = useContext(KanbanContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const location = useLocation().pathname.split('/')[1];
    const currentBoard = convertFromKebabCase(location) || boards[0].text;

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }

    // styles
    const stylesNavLeft = { height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
    const stylesTitleSection = { marginTop: 1.5 };
    const stylesKanbanLogo = { paddingInline: 3 };
    const stylesBoardsList = { marginTop: 5.25 };
    const stylesBoardLink = { display: 'flex', flexDirection: 'row', alignItems: 'center', paddingInline: 2 };
    const stylesDashboardIcon = { paddingInline: 1 };
    const stylesAddBoardButton = { marginLeft: 4, marginTop: 4 };
    const stylesDarkModeSwitch = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 };

    const BoardLink = ({ board }) => {
        const boardLinkIcon = (
            <Box sx={stylesDashboardIcon}>
                <DashboardIcon />
            </Box>
        );

        const boardLinkText = (
            <Link
                href={`/${convertToKebabCase(board.text)}`}
                underline="none"
                sx={{ color: 'text.primary' }}
            >
                {board.text}
            </Link>
        );

        const styleBoardIfSelected = {
            bgcolor: ((board.text === currentBoard) ? 'background.active' : 'background.secondary'),
            paddingBlock: 1
        };

        return (
            <Box
                key={board.id}
                sx={styleBoardIfSelected}>
                <Box sx={stylesBoardLink}>
                    {boardLinkIcon}
                    {boardLinkText}
                </Box>
            </Box>
        )
    };

    const navTitle = (
        <Box sx={stylesKanbanLogo}>
            <h1>kanban</h1>
        </Box>
    );

    const listOfBoards = (
        <Box sx={stylesBoardsList}>
            {boards.map(board => <BoardLink key={board.id} board={board} />)}
        </Box>
    );

    const addBoardButton = (
        <Box sx={stylesAddBoardButton}>
            <AddButton itemType='board' />
        </Box>
    );

    const themeSwitch = (
        <Box sx={stylesDarkModeSwitch}>
            <LabeledSwitch handleChange={toggleTheme} checked={darkMode} />
        </Box>
    );

    return (
        <Box sx={stylesNavLeft}>
            <Box sx={stylesTitleSection}>
                {navTitle}
                {listOfBoards}
                {addBoardButton}
                {themeSwitch}
            </Box>
        </Box>
    );
}

export default memo(NavLeft);
