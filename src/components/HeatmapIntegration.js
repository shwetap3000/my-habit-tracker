import React, { useState } from 'react';
import WeeklyHabitHeatmap from './WeeklyHabitHeatmap';

function HeatmapIntegration() {
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

  const handleIntensityChange = (habitName, day, newIntensity) => {
    setHabitIntensities(prev => ({
      ...prev,
      [habitName]: {
        ...prev[habitName],
        [day]: newIntensity
      }
    }));
  };

return (
  <section style={{ padding: '20px' }}>
    {/* Section Title */}
    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
      Weekly Habit Heatmap Tracker
    </h2>

    {/* Habit Heatmaps Grid */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        justifyItems: 'center',
      }}
    >
      {Object.keys(habitIntensities).map((habit) => (
        <WeeklyHabitHeatmap
          key={habit}
          habitName={habit}
          onIntensityChange={(day, intensity) =>
            handleIntensityChange(habit, day, intensity)
          }
        />
      ))}
    </div>
  </section>
);

}

export default HeatmapIntegration;
