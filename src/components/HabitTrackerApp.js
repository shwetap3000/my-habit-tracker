import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// Fixed import paths - components are in the same directory level
import TrackerCard from "./TrackerCard";
import Header from "./Header";
import TreeGrowth from "./TreeGrowth";
import withI18nReady from "./withI18nReady";
// Fixed CSS import path - App.css is in the parent src directory
import "../App.css";

// Main app component that handles the habit tracking logic
function HabitTrackerApp() {
  const { t } = useTranslation();
  // State for dark mode and completed habits
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedHabits");
    return saved ? JSON.parse(saved) : {};
  });

  // Define habit list using translations - this will work because i18n is ready
  const habitList = [
    { key: "wakeUpTime", label: t("habits.wakeUpTime") },
    { key: "waterIntake", label: t("habits.waterIntake") },
    { key: "sleep", label: t("habits.sleep") },
    { key: "meditation", label: t("habits.meditation") },
    { key: "exercise", label: t("habits.exercise") },
    { key: "healthyEating", label: t("habits.healthyEating") },
    { key: "gratitude", label: t("habits.gratitude") },
    { key: "journaling", label: t("habits.journaling") },
    { key: "screenTime", label: t("habits.screenTime") },
    { key: "study", label: t("habits.study") },
    { key: "workout", label: t("habits.workout") },
    { key: "steps", label: t("habits.steps") },
    { key: "selfCare", label: t("habits.selfCare") },
    { key: "goalSetting", label: t("habits.goalSetting") },
    { key: "skincare", label: t("habits.skincare") },
  ];

  // Toggle dark/light mode and persist
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  // Handle habit completion tracking and persist
  const handleCompletion = (habitKey, day) => {
    setCompleted((prev) => {
      const updated = {
        ...prev,
        [habitKey]: {
          ...prev[habitKey],
          [day]: !prev[habitKey]?.[day],
        },
      };
      localStorage.setItem("completedHabits", JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate total completed habits for tree growth
  const totalCompleted = Object.values(completed).reduce((sum, days) => {
    return sum + Object.values(days).filter(Boolean).length;
  }, 0);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="trackers">
        {habitList.map((habit) => (
          <TrackerCard
            key={habit.key}
            habit={habit.label}
            completedDays={completed[habit.key] || {}}
            onCheck={(day) => handleCompletion(habit.key, day)}
          />
        ))}
      </div>
      <TreeGrowth completedCount={totalCompleted} />
    </div>
  );
}

export default withI18nReady(HabitTrackerApp);
