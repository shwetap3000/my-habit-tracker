import React from "react";
import { useTranslation } from "react-i18next";

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

  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / days.length) * 100);

  return (
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
