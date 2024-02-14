import React from "react";
import KanbanApp from './components/KanbanApp.js';
import { KanbanProvider } from './contexts/KanbanContext.js';
import './App.css';

export default function App() {
  return (
    <KanbanProvider>
      <KanbanApp />
    </KanbanProvider>
  );
}
