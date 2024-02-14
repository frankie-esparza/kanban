import React, { useContext, useState, memo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KanbanContext } from '../contexts/KanbanContext.js'
import { convertToKebabCase } from '../helpers/helpers.js';
import Board from './Board.js';
import { v4 as uuidv4 } from 'uuid';
import { getDesignTokens } from '../helpers/themeHelpers.js';

function KanbanApp() {
    const kanban = useContext(KanbanContext);
    const boards = kanban.boards;
    let localStorageDarkMode = JSON.parse(window.localStorage.getItem('darkMode'));
    const [darkMode, setDarkMode] = useState((localStorageDarkMode !== null) ? localStorageDarkMode : true);
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    const theme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    {boards.map(board =>
                        <Route
                            key={uuidv4()}
                            path={`/${convertToKebabCase(board.text)}`}
                            element={
                                <Board
                                    board={board}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                />
                            }
                        />)}
                    <Route
                        key={uuidv4()}
                        path={`/`}
                        element={
                            <Board
                                board={boards[0]}
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                            />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default memo(KanbanApp);
