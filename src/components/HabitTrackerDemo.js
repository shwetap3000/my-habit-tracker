import React, { useState } from 'react';
import WeeklyHabitHeatmap from './WeeklyHabitHeatmap';

const demoHabits = [
  'Morning Exercise',
  'Reading',
  'Meditation',
  'Water Intake',
  'Sleep Schedule'
];

function HabitTrackerDemo() {
  const [habitData, setHabitData] = useState(
    demoHabits.reduce((acc, habit) => {
      acc[habit] = {
        Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
      };
      return acc;
    }, {})
  );

  const handleIntensityChange = (habitName, day, newIntensity) => {
    setHabitData(prev => ({
      ...prev,
      [habitName]: {
        ...prev[habitName],
        [day]: newIntensity
      }
    }));
  };

  return (
<div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
  <h1
    style={{
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#333', // Neutral dark tone
    }}
  >
    Weekly Habit Tracker with Heatmap
  </h1>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    }}
  >
    {demoHabits.map((habit) => (
      <WeeklyHabitHeatmap
        key={habit}
        habitName={habit}
        onIntensityChange={(day, intensity) =>
          handleIntensityChange(habit, day, intensity)
        }
      />
    ))}
  </div>



  <div
  style={{
    background: '#f7fafc',
    padding: '30px',
    borderRadius: '12px',
    marginTop: '40px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)', // subtle depth
  }}
>
  <h3
    style={{
      marginBottom: '20px',
      color: '#2d3748',
      fontSize: '1.6rem',
      fontWeight: '600',
      textAlign: 'center',
    }}
  >
    How the Heatmap Works
  </h3>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
    }}
  >
    {/* Color Intensity Levels */}
    <div>
      <h4
        style={{
          color: '#4a5568',
          marginBottom: '12px',
          fontSize: '1.1rem',
          fontWeight: '500',
        }}
      >
        Color Intensity Levels
      </h4>
      <ul
        style={{
          color: '#4a5568',
          lineHeight: '1.7',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {[
          { color: '#f7fafc', border: true, text: 'Level 0: Not started' },
          { color: '#c6f6d5', text: 'Level 1: Low completion' },
          { color: '#9ae6b4', text: 'Level 2: Medium completion' },
          { color: '#68d391', text: 'Level 3: High completion' },
          { color: '#38a169', text: 'Level 4: Complete' },
        ].map((level, idx) => (
          <li key={idx} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                background: level.color,
                border: level.border ? '1px solid #e2e8f0' : 'none',
                marginRight: '10px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            ></span>
            {level.text}
          </li>
        ))}
      </ul>
    </div>

    {/* How to Use */}
    <div>
      <h4
        style={{
          color: '#4a5568',
          marginBottom: '12px',
          fontSize: '1.1rem',
          fontWeight: '500',
        }}
      >
        How to Use
      </h4>
      <ul
        style={{
          color: '#4a5568',
          lineHeight: '1.7',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        <li>• Click on any day square to cycle through completion levels</li>
        <li>• Hover over squares to see the exact completion level</li>
        <li>• Colors transition smoothly from light to dark green</li>
        <li>• Works on both desktop and mobile devices</li>
        <li>• Data can be saved for persistence</li>
      </ul>
    </div>

    {/* Features */}
    <div>
      <h4
        style={{
          color: '#4a5568',
          marginBottom: '12px',
          fontSize: '1.1rem',
          fontWeight: '500',
        }}
      >
        Features
      </h4>
      <ul
        style={{
          color: '#4a5568',
          lineHeight: '1.7',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        <li>• 7-day weekly view (Sun-Sat)</li>
        <li>• Interactive heatmap visualization</li>
        <li>• Responsive design for all screen sizes</li>
        <li>• Smooth hover and click transitions</li>
        <li>• Extensible for multiple habits</li>
      </ul>
    </div>
  </div>
</div>

    </div>
  );
}

export default HabitTrackerDemo;
