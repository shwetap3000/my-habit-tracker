import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackerCard from './components/TrackerCard';
import Header from './components/Header';
import TreeGrowth from './components/TreeGrowth';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HabitTrackerApp from "./components/HabitTrackerApp";

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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [completed, setCompleted] = useState({});

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleCompletion = (habit, day) => {
    setCompleted(prev => ({
      ...prev,
      [habit]: {
        ...prev[habit],
        [day]: !prev[habit]?.[day],
      },
    }));
  };

  const totalCompleted = Object.values(completed).reduce((sum, days) => {
    return sum + Object.values(days).filter(Boolean).length;
  }, 0);
  
  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="trackers">
                {habitList.map((habit, idx) => (
                  <TrackerCard
                    key={idx}
                    habit={habit}
                    completedDays={completed[habit] || {}}
                    onCheck={(day) => handleCompletion(habit, day)}
                  />
                ))}
                <TreeGrowth completedCount={totalCompleted} />
              </div>
            }
          />

          {/* Contact Page */}
          <Route path="/Footer" element={<Footer />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
