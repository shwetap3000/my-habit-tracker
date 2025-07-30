import React from 'react';
import './TrackerCard.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function TrackerCard({ habit, completedDays, onCheck }) {
  return (
    <div className="tracker-card">
      <h3>{habit}</h3>
      <div className="days-row">
        {days.map(day => (
          <label key={day}>
            <input
              type="checkbox"
              checked={!!completedDays[day]}
              onChange={() => onCheck(day)}
            />
            <span>{day}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TrackerCard;