import React from "react";
import { useTranslation } from "react-i18next";
import "./TrackerCard.css";

function TrackerCard({ habit, completedDays, onCheck }) {
  const { t, ready } = useTranslation();

  // Return null if translations aren't ready
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

  return (
    <div className="tracker-card">
      <h3>{habit}</h3>
      <div className="days-row">
        {days.map((day) => (
          <label key={day.key}>
            <input
              type="checkbox"
              checked={!!completedDays[day.key]}
              onChange={() => onCheck(day.key)}
            />
            <span>{day.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TrackerCard;
