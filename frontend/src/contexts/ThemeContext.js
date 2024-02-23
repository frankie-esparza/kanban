import React, { createContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../helpers/themeHelpers.js';

export const ThemeContext = createContext();

export function CustomThemeProvider(props) {
    // Theme
    let localStorageDarkMode = JSON.parse(window.localStorage.getItem('darkMode'));
    const [darkMode, setDarkMode] = useState((localStorageDarkMode !== null) ? localStorageDarkMode : true);
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    const theme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));


    return (
        <ThemeContext.Provider value={{ theme, darkMode, setDarkMode }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
