import React, { useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const intensityLabels = ["Not started", "Low", "Medium", "High", "Complete"];
const intensityColors = ["#e5e7eb", "#a7f3d0", "#34d399", "#059669", "#047857"]; // Light→Dark Green

function WeeklyHabitHeatmap({ habitName = "Habit", onIntensityChange, darkMode }) {
  const [intensities, setIntensities] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: 0 }), {})
  );

  const handleDayClick = (day) => {
    setIntensities((prev) => {
      const newIntensity = (prev[day] + 1) % 5;
      const newIntensities = { ...prev, [day]: newIntensity };
      if (onIntensityChange) onIntensityChange(day, newIntensity);
      return newIntensities;
    });
  };

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#f9fafb" : "#111827",
        boxShadow: darkMode
          ? "0 4px 12px rgba(255,255,255,0.05)"
          : "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "350px",
        margin: "1rem auto",
        textAlign: "center",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>{habitName}</h3>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            title={`${day}: ${intensityLabels[intensities[day]]}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDayClick(day);
              }
            }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: intensityColors[intensities[day]],
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow:
                darkMode
                  ? "0 2px 6px rgba(255,255,255,0.1)"
                  : "0 2px 6px rgba(0,0,0,0.1)",
              color: darkMode ? "#111" : "#fff",
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{day}</span>
            <span style={{ fontSize: "0.7rem" }}>{intensities[day]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyHabitHeatmap;
