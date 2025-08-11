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
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2d3748' }}>
        Weekly Habit Tracker with Heatmap
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {demoHabits.map(habit => (
          <WeeklyHabitHeatmap
            key={habit}
            habitName={habit}
            onIntensityChange={(day, intensity) => 
              handleIntensityChange(habit, day, intensity)
            }
          />
        ))}
      </div>

      <div style={{ 
        background: '#f7fafc', 
        padding: '30px', 
        borderRadius: '12px',
        marginTop: '40px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#2d3748', fontSize: '1.5rem' }}>
          How the Heatmap Works
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Color Intensity Levels</h4>
            <ul style={{ color: '#4a5568', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: '#f7fafc', border: '1px solid #e2e8f0', marginRight: '10px', borderRadius: '4px' }}></span> Level 0: Not started</li>
              <li style={{ marginBottom: '8px' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: '#c6f6d5', marginRight: '10px', borderRadius: '4px' }}></span> Level 1: Low completion</li>
              <li style={{ marginBottom: '8px' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: '#9ae6b4', marginRight: '10px', borderRadius: '4px' }}></span> Level 2: Medium completion</li>
              <li style={{ marginBottom: '8px' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: '#68d391', marginRight: '10px', borderRadius: '4px' }}></span> Level 3: High completion</li>
              <li style={{ marginBottom: '8px' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', background: '#38a169', marginRight: '10px', borderRadius: '4px' }}></span> Level 4: Complete</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>How to Use</h4>
            <ul style={{ color: '#4a5568', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>• Click on any day square to cycle through completion levels</li>
              <li style={{ marginBottom: '8px' }}>• Hover over squares to see the exact completion level</li>
              <li style={{ marginBottom: '8px' }}>• Colors transition smoothly from light to dark green</li>
              <li style={{ marginBottom: '8px' }}>• Works on both desktop and mobile devices</li>
              <li style={{ marginBottom: '8px' }}>• Data can be saved for persistence</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Features</h4>
            <ul style={{ color: '#4a5568', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>• 7-day weekly view (Sun-Sat)</li>
              <li style={{ marginBottom: '8px' }}>• Interactive heatmap visualization</li>
              <li style={{ marginBottom: '8px' }}>• Responsive design for all screen sizes</li>
              <li style={{ marginBottom: '8px' }}>• Smooth hover and click transitions</li>
              <li style={{ marginBottom: '8px' }}>• Extensible for multiple habits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitTrackerDemo;
