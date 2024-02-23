import React, { useContext, useState, useEffect, memo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KanbanContext } from '../contexts/KanbanContext.js'
import { ThemeContext } from '../contexts/ThemeContext.js'
import { convertToKebabCase } from '../helpers/helpers.js';
import Board from './Board.js';
import { v4 as uuidv4 } from 'uuid';
import { fetchWrapper } from '../helpers/fetchHelpers.js';

function KanbanApp() {
    // Context
    const { boards, getItems } = useContext(KanbanContext);
    const { theme, darkMode, setDarkMode } = useContext(ThemeContext);

    // Get Boards after 1st Render
    useEffect(() => { fetchWrapper(() => getItems('board')) }, []);

    // Theme
    // let localStorageDarkMode = JSON.parse(window.localStorage.getItem('darkMode'));
    // const [darkMode, setDarkMode] = useState((localStorageDarkMode !== null) ? localStorageDarkMode : true);
    // window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // const theme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    {boards.map(board =>
                        <Route
                            key={board.id}
                            path={`/${convertToKebabCase(board.text)}`}
                            element={
                                <Board board={board} />
                            }
                        />)}
                    <Route
                        key={uuidv4()}
                        path={`/`}
                        element={
                            <Board board={boards[0]} />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>

    );
}

export default memo(KanbanApp);
