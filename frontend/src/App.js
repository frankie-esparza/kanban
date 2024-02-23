import React from "react";
import KanbanApp from './components/KanbanApp.js';
import { KanbanProvider } from './contexts/KanbanContext.js';
import { CustomThemeProvider } from './contexts/ThemeContext.js';
import './App.css';

export default function App() {
  return (
    <CustomThemeProvider>
      <KanbanProvider>
        <KanbanApp />
      </KanbanProvider>
    </CustomThemeProvider>
  );
}
