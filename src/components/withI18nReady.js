import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TrackerCard from "./TrackerCard";
import Header from "./Header";
import TreeGrowth from "./TreeGrowth";
import WeeklyHabitHeatmap from "./WeeklyHabitHeatmap";
import LanguageSwitcher from "./LanguageSwitcher";
import withI18nReady from "./withI18nReady";
import "../App.css"; // go up one folder to src


function HabitTrackerApp() {
  const { t } = useTranslation();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedHabits");
    return saved ? JSON.parse(saved) : {};
  });

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

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

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

  const totalCompleted = Object.values(completed).reduce((sum, days) => {
    return sum + Object.values(days).filter(Boolean).length;
  }, 0);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <LanguageSwitcher darkMode={darkMode} />

      <main className="trackers">
        {habitList.map((habit) => (
          <TrackerCard
            key={habit.key}
            habit={habit.label}
            completedDays={completed[habit.key] || {}}
            onCheck={(day) => handleCompletion(habit.key, day)}
          />
        ))}
      </main>

      <TreeGrowth completedCount={totalCompleted} />

      <div className="heatmap-section">
        {habitList.slice(0, 7).map((habit) => (
          <WeeklyHabitHeatmap key={habit.key} habitName={habit.label} />
        ))}
      </div>
    </div>
  );
}

export default withI18nReady(HabitTrackerApp);
