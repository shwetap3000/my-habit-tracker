import React, { useState } from 'react';
import './WeeklyHabitHeatmap.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const intensityLabels = ['Not started', 'Low', 'Medium', 'High', 'Complete'];

function WeeklyHabitHeatmap({ habitName = 'Habit', onIntensityChange }) {
  const [intensities, setIntensities] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: 0 }), {})
  );

  const handleDayClick = (day) => {
    setIntensities(prev => {
      const newIntensity = (prev[day] + 1) % 5;
      const newIntensities = { ...prev, [day]: newIntensity };
      if (onIntensityChange) {
        onIntensityChange(day, newIntensity);
      }
      return newIntensities;
    });
  };

  return (
    <div className="weekly-habit-heatmap">
      <h3 className="habit-title">{habitName}</h3>
      <div className="heatmap-container">
        {days.map(day => (
          <div
            key={day}
            className={`heatmap-day intensity-${intensities[day]}`}
            onClick={() => handleDayClick(day)}
            title={`${day}: ${intensityLabels[intensities[day]]}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDayClick(day);
              }
            }}
          >
            <span className="day-label">{day}</span>
            <span className="intensity-indicator">{intensities[day]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyHabitHeatmap;
