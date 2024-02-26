import React, { useContext, useEffect, memo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { KanbanContext } from '../../contexts/KanbanContext.js';
import { ThemeContext } from '../../contexts/ThemeContext.js'
import { convertToKebabCase } from '../../helpers/helpers.js';
import Board from '../2-Board/Board.js';

function KanbanApp() {
    const { boards, getAllItems } = useContext(KanbanContext);
    const { theme } = useContext(ThemeContext);

    // Get All Items (Statuses, Boards, Tasks, & Subtasks) when Kanban App first loads
    // TODO - figure out why linter says getAllItems should be in dependency array
    // but when added, it causes an infite loop
    useEffect(() => {
        getAllItems();
    }, []
    );

    const boardRoutes = (
        boards.map(board =>
            <Route
                key={board.id}
                path={`/${convertToKebabCase(board.text)}`}
                element={<Board board={board} />}
            />)
    );

    const defaultRoute = (
        <Route
            path={`/`}
            element={<Board board={boards[0]} />}
        />
    );

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    {boardRoutes}
                    {defaultRoute}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default memo(KanbanApp);
