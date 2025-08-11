import React, { useState } from 'react';
import TrackerCard from './components/TrackerCard';
import Header from './components/Header';
import TreeGrowth from './components/TreeGrowth';
import HabitTrackerDemo from './components/HabitTrackerDemo';
import './App.css';
import './components/Footer'
import Footer from './components/Footer';
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
  const [habitIntensities, setHabitIntensities] = useState({
    'Morning Exercise': {
      Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
    },
    'Reading': {
      Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
    },
    'Meditation': {
      Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
    }
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleIntensityChange = (habitName, day, newIntensity) => {
    setHabitIntensities(prev => ({
      ...prev,
      [habitName]: {
        ...prev[habitName],
        [day]: newIntensity
      }
    }));
  };

  const totalCompleted = Object.values(habitIntensities).reduce((sum, days) => {
    return sum + Object.values(days).filter(val => val > 0).length;
  }, 0);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <HabitTrackerDemo onIntensityChange={handleIntensityChange} habitIntensities={habitIntensities} />
      
      <Footer></Footer>
    </div>

  );
}

export default App;
