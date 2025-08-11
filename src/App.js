import React, { useState } from 'react';
import TrackerCard from './components/TrackerCard';
import Header from './components/Header';
import TreeGrowth from './components/TreeGrowth';
import HabitTrackerDemo from './components/HabitTrackerDemo';
import './App.css';
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
  'Skincare',
  'Plant Care/Watering',
  'Gym Workout',
  'Focused Study Session',
  'Daily Journaling',
  'Gardening',
  'Meal Prep',
  'Hydration Tracking'
];

function App() {
  const [habits, setHabits] = useState(habitList);

  return (
    <div className="app-container">
      <Header />
      <TreeGrowth />
      <HabitTrackerDemo habits={habits} />
      <div className="tracker-cards">
        {habits.map((habit, index) => (
          <TrackerCard key={index} habit={habit} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
