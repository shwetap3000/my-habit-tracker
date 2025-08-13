import React from "react";
import TrackerCard from "./TrackerCard";
import TreeGrowth from "./TreeGrowth";
import "../App.css";

// This component now receives all its data as props.
function HabitTrackerApp({ habitList, completedData, onCheck }) {

  // Calculate total completed habits for the TreeGrowth component
  const totalCompleted = Object.values(completedData).reduce((sum, dates) => {
    return sum + Object.values(dates).filter(Boolean).length;
  }, 0);

  // Function to get the dates for the current week (e.g., for TrackerCard)
  // NOTE: You will need to update TrackerCard.js to work with full dates.
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    // Go back to the last Sunday
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        // Format date as YYYY-MM-DD
        dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  };

  const weekDates = getWeekDates();

  return (
    <>
      <div className="trackers">
        {habitList.map((habit) => (
          <TrackerCard
            key={habit.key}
            habit={habit.label}
            habitKey={habit.key} // Pass habitKey to onCheck
            completedDays={completedData[habit.key] || {}}
            onCheck={onCheck} // onCheck now receives (habitKey, dateString)
            weekDates={weekDates} // Pass the specific dates for the week
          />
        ))}
      </div>
      <TreeGrowth completedCount={totalCompleted} />
    </>
  );
}

export default HabitTrackerApp;
