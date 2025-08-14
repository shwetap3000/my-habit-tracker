import React, {useState} from "react";
import { useTranslation } from "react-i18next";

 ui-polish
function TrackerCard({ habit, completedDays, onCheck, darkMode }) {
  const { t, ready } = useTranslation();
  if (!ready) return null;

  const days = [
    { key: "sun", label: t("days.sun") },
    { key: "mon", label: t("days.mon") },
    { key: "tue", label: t("days.tue") },
    { key: "wed", label: t("days.wed") },
    { key: "thu", label: t("days.thu") },
    { key: "fri", label: t("days.fri") },
    { key: "sat", label: t("days.sat") },
  ];

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
 main

  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / days.length) * 100);

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
 ui-polish
    <div
      style={{
        padding: "1.25rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s",
        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#f9fafb" : "#111827",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>
        {habit}
      </h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {days.map((day) => (
          <label
            key={day.key}
            style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={!!completedDays[day.key]}
              onChange={() => onCheck(day.key)}
              style={{
                width: "1.25rem",
                height: "1.25rem",
                borderRadius: "0.25rem",
                border: "1px solid",
                borderColor: completedDays[day.key] ? "#22c55e" : "#d1d5db",
                backgroundColor: completedDays[day.key] ? "#22c55e" : "#e5e7eb",
                transition: "all 0.2s",
              }}
            />
            <span style={{ fontSize: "0.875rem", userSelect: "none" }}>{day.label}</span>

          </label>
        ))}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: "0.5rem",
          width: "100%",
          backgroundColor: "#d1d5db",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: "#22c55e",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}

export default TrackerCard;
