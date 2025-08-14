import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import "./TrackerCard.css";

// The component now receives habitKey and weekDates as props
function TrackerCard({
  habit,
  habitKey,
  completedDays,
  onCheck,
  weekDates,
  emoji,
  onEdit
}) {
  const { t, ready } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
const [inputValue, setInputValue] = useState(habit.label);

  // Return null if translations aren't ready or props are missing
  if (!ready || !weekDates) return null;

  // Helper function to get the three-letter day abbreviation (e.g., "Sun") from a date string
  const getDayLabel = (dateString) => {
    const date = new Date(dateString);
    // Adding a time zone offset to prevent the date from shifting due to UTC conversion
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="tracker-card">
      {/* <h3>{habit.label} {emoji}</h3> */}
      <h3>
        {emoji}{" "}
        {isEditing ? (
          <>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={() => {
                onEdit(inputValue);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            {habit.label}{" "}
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </h3>

      <div className="days-row">
        {/* Map over the weekDates array passed in as a prop */}
        {weekDates.map((dateString) => (
          <label key={dateString} className="day-label">
            <input
              type="checkbox"
              // Check for completion using the full date string
              checked={!!completedDays[dateString]}
              // Pass the habit's key and the full date string to the onCheck handler
              onChange={() => onCheck(habitKey, dateString)}
            />
            {/* Display the short day name (e.g., Mon, Tue) */}
            <span>{getDayLabel(dateString)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TrackerCard;
