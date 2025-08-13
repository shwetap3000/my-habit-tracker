import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import HabitTrackerApp from "./components/HabitTrackerApp";
import MonthlySummary from "./components/MonthlySummary"; // Import the new component
import Footer from './components/Footer';
import withI18nReady from "./components/withI18nReady";

// Import CSS
import "./App.css";

function App() {
  const { t } = useTranslation();

  // --- STATE MANAGEMENT ---
  // All app state is now managed here to be shared between pages.

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // State for completed habits, now using full dates
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedHabits");
    return saved ? JSON.parse(saved) : {};
  });

  // --- HABIT LIST ---
  // This list is defined once and passed to other components.
  const habitList = [
    { key: "wakeUpTime", label: t("habits.wakeUpTime") },
    { key: "waterIntake", label: t("habits.waterIntake") },
    { key: "sleep", label: t("habits.sleep") },
    { key: "meditation", label: t("habits.meditation") },
    { key: "exercise", label: t("habits.exercise") },
    { key: "healthyEating", label: t("habits.healthyEating") },
    { key: "gratitude", label: t("habits.gratitude") },
    { key: "journaling", label: t("habits.journaling") },
    { key: "screenTime", label: t("habits.screenTime") },
    { key: "study", label: t("habits.study") },
    { key: "workout", label: t("habits.workout") },
    { key: "steps", label: t("habits.steps") },
    { key: "selfCare", label: t("habits.selfCare") },
    { key: "goalSetting", label: t("habits.goalSetting") },
    { key: "skincare", label: t("habits.skincare") },
  ];

  // --- FUNCTIONS ---

  // Toggle dark/light mode and persist
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Save theme to localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  // Handle habit completion using a full date string (YYYY-MM-DD)
  const handleCompletion = (habitKey, dateString) => {
    setCompleted((prev) => {
      const updated = {
        ...prev,
        [habitKey]: {
          ...prev[habitKey],
          [dateString]: !prev[habitKey]?.[dateString],
        },
      };
      // Save to localStorage
      localStorage.setItem("completedHabits", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Navbar />

        <main>
          <Routes>
            {/* Main habit tracker page */}
            <Route
              path="/"
              element={
                <HabitTrackerApp
                  habitList={habitList}
                  completedData={completed}
                  onCheck={handleCompletion}
                />
              }
            />

            {/* NEW: Monthly Summary Page */}
            <Route
              path="/summary"
              element={
                <MonthlySummary
                  habitList={habitList}
                  completedData={completed}
                />
              }
            />

            {/* You can add other routes here if needed */}

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// Wrap the App with withI18nReady to ensure translations are loaded
export default withI18nReady(App);