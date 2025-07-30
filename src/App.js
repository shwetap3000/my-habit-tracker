import React, { useState } from 'react';
import TrackerCard from './components/TrackerCard';
import Header from './components/Header';
import TreeGrowth from './components/TreeGrowth';
import './App.css';

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
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="trackers">
        {habitList.map((habit, idx) => (
          <TrackerCard
            key={idx}
            habit={habit}
            completedDays={completed[habit] || {}}
            onCheck={(day) => handleCompletion(habit, day)}
          />
        ))}
      </div>
      <TreeGrowth completedCount={totalCompleted} />
    </div>
  );
}

export default App;