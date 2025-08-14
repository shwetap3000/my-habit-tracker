import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Components
import Header from './components/Header';
import TreeGrowth from './components/TreeGrowth';
import Navbar from './components/Navbar';
import HabitTrackerApp from "./components/HabitTrackerApp";
 ui-polish
import "./App.css";
const habitList = [
  'Wake Up Time',
  'Water Intake',
  'Sleep',
  'Meditation',
  'Exercise',
  'Healthy Eating',
  'Gratitude',
  'Journaling',
  'Screen Time',
  'Study',
  'Workout',
  'Steps',
  'Self-Care',
  'Goal Setting',
  'Skincare'
];



const habitKeys = [
  'wakeUpTime',
  'waterIntake',
  'sleep',
  'meditation',
  'exercise',
  'healthyEating',
  'gratitude',
  'journaling',
  'screenTime',
  'study',
  'workout',
  'steps',
  'selfCare',
  'goalSetting',
  'skincare'
];

const handleReset = () => {
  if (window.confirm("Are you sure you want to reset everything?")) {
    window.location.reload();
  }
};

function App() {
  const { t } = useTranslation();

  // --- STATE MANAGEMENT ---
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedHabits");
    return saved ? JSON.parse(saved) : {};
  });

  const habitList = habitKeys.map(key => ({ key, label: t(`habits.${key}`) }));

  // --- FUNCTIONS ---
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleCompletion = (habitKey, dateString) => {
    setCompleted(prev => {
      const updated = {
        ...prev,
        [habitKey]: {
          ...prev[habitKey],
          [dateString]: !prev[habitKey]?.[dateString],
        },
      };
      localStorage.setItem("completedHabits", JSON.stringify(updated));
      return updated;
    });
  };

  const totalCompleted = Object.values(completed).reduce((sum, days) => {
    return sum + Object.values(days).filter(Boolean).length;
  }, 0);

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Navbar />

        <main>
          <Routes>
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
            <Route
              path="/summary"
              element={
                <MonthlySummary
                  habitList={habitList}
                  completedData={completed}
                />
              }
            />
            <Route path="/About" element={<About />} />
          </Routes>
        </main>

        <Routes>
          <Route
            path="/"
            element={
              <div className="trackers">
                {habitList.map((habit, idx) => (
                  <TrackerCard
                    key={idx}
                    habit={habit}
                    completedDays={completed[habit.key] || {}}
                    onCheck={(day) => handleCompletion(habit.key, day)}
                  />
                ))}
                <TreeGrowth completedCount={totalCompleted} />
              </div>
            }
          />
          <Route path="/Footer" element={<Footer />} />
        </Routes>

        <Footer />
        <Foot />
      </div>
    </Router>
  );
}

// Wrap App with i18n loader
export default withI18nReady(App);
