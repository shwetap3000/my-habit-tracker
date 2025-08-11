import React from "react";
import HabitTrackerApp from "./components/HabitTrackerApp";
import "./App.css";

// Simplified App component - let i18next handle initialization internally
function App() {
  // Render the main app directly - i18next will handle loading states
  return <HabitTrackerApp />;
}

export default App;
