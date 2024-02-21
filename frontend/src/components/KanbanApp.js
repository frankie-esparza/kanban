import React, { useContext, useState, useEffect, memo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KanbanContext } from '../contexts/KanbanContext.js'
import { convertToKebabCase } from '../helpers/helpers.js';
import Board from './Board.js';
import { v4 as uuidv4 } from 'uuid';
import { getDesignTokens } from '../helpers/themeHelpers.js';
import { fetchWrapper } from '../helpers/fetchHelpers.js';

export const port = 5000;

function KanbanApp() {
    // Context
    const { boards, setBoards } = useContext(KanbanContext);

    // Get Boards
    const getBoards = async () => {
        const res = await fetch(`http://localhost:${port}/boards`);
        const data = await res.json();
        setBoards(data);
    };
    useEffect(() => { fetchWrapper(getBoards) }, [])

    // Theme
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
