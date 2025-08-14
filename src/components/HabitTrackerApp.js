import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import TrackerCard from "./TrackerCard";
import TreeGrowth from "./TreeGrowth";
import "../App.css";

function HabitTrackerApp() {
  const { t } = useTranslation();

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Habit completion state
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedHabits");
    return saved ? JSON.parse(saved) : {};
  });

  const habitList = [
    { key: "wakeUpTime", label: t("habits.wakeUpTime"), tooltip: t("tooltips.wakeUpTime") },
    { key: "waterIntake", label: t("habits.waterIntake"), tooltip: t("tooltips.waterIntake") },
    { key: "sleep", label: t("habits.sleep"), tooltip: t("tooltips.sleep") },
    { key: "meditation", label: t("habits.meditation"), tooltip: t("tooltips.meditation") },
    { key: "exercise", label: t("habits.exercise"), tooltip: t("tooltips.exercise") },
    { key: "healthyEating", label: t("habits.healthyEating"), tooltip: t("tooltips.healthyEating") },
    { key: "gratitude", label: t("habits.gratitude"), tooltip: t("tooltips.gratitude") },
    { key: "journaling", label: t("habits.journaling"), tooltip: t("tooltips.journaling") },
    { key: "screenTime", label: t("habits.screenTime"), tooltip: t("tooltips.screenTime") },
    { key: "study", label: t("habits.study"), tooltip: t("tooltips.study") },
    { key: "workout", label: t("habits.workout"), tooltip: t("tooltips.workout") },
    { key: "steps", label: t("habits.steps"), tooltip: t("tooltips.steps") },
    { key: "selfCare", label: t("habits.selfCare"), tooltip: t("tooltips.selfCare") },
    { key: "goalSetting", label: t("habits.goalSetting"), tooltip: t("tooltips.goalSetting") },
    { key: "skincare", label: t("habits.skincare"), tooltip: t("tooltips.skincare") },
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

  const resetWeek = () => {
    if (window.confirm("Are you sure you want to reset all habits for this week?")) {
      setCompleted({});
      localStorage.removeItem("completedHabits");
    }
  };

  const totalCompleted = Object.values(completed).reduce(
    (sum, days) => sum + Object.values(days).filter(Boolean).length,
    0
  );

  const totalPossible = habitList.length * 7;

  return (
    <div
      className={`app-container min-h-screen p-6 ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Weekly Summary + Reset */}
      <div className="summary flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">
          Weekly Progress: {totalCompleted}/{totalPossible} completed
        </h2>
        <button
          onClick={resetWeek}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Reset Week
        </button>
      </div>

      {/* Habit Tracker Cards */}
      <main className="trackers grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {habitList.map((habit) => (
          <TrackerCard
            key={habit.key}
            habit={habit.label}
            tooltip={habit.tooltip}
            completedDays={completed[habit.key] || {}}
            onCheck={(day) => handleCompletion(habit.key, day)}
            darkMode={darkMode}
          />
        ))}
      </main>

      {/* Tree Growth visualization */}
      <div className="mt-10">
        <TreeGrowth completedCount={totalCompleted} />
      </div>
    </div>
  );
}

export default HabitTrackerApp;


// import React from "react";

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Header from "./Header";
// import TrackerCard from "./TrackerCard";
// import TreeGrowth from "./TreeGrowth";
// import "../App.css";

// // This component now receives all its data as props.
// function HabitTrackerApp({ habitList, completedData, onCheck }) {

//   // Calculate total completed habits for the TreeGrowth component
//   const totalCompleted = Object.values(completedData).reduce((sum, dates) => {
//     return sum + Object.values(dates).filter(Boolean).length;
//   }, 0);

//   // Function to get the dates for the current week (e.g., for TrackerCard)
//   // NOTE: You will need to update TrackerCard.js to work with full dates.
//   const getWeekDates = () => {
//     const dates = [];
//     const today = new Date();
//     // Go back to the last Sunday
//     const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

//     for (let i = 0; i < 7; i++) {
//         const date = new Date(startOfWeek);
//         date.setDate(date.getDate() + i);
//         // Format date as YYYY-MM-DD
//         dates.push(date.toISOString().slice(0, 10));
//     }
//     return dates;
//   };

//   const weekDates = getWeekDates();

//   return (

//     <>
//       <div className="trackers">

//     <div className={`app-container min-h-screen p-6 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
//       {/* Header */}
//       <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

//       {/* Weekly Summary + Reset */}
//       <div className="summary flex flex-col sm:flex-row justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold mb-2 sm:mb-0">
//           Weekly Progress: {totalCompleted}/{totalPossible} completed
//         </h2>
//         <button
//           onClick={resetWeek}
//           className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
//         >
//           Reset Week
//         </button>
//       </div>

//       {/* Habit Tracker Cards */}
//       <main className="trackers grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {habitList.map((habit) => (
//           <TrackerCard
//             key={habit.key}
//             habit={habit.label}
//             habitKey={habit.key} // Pass habitKey to onCheck
//             completedDays={completedData[habit.key] || {}}
//             onCheck={onCheck} // onCheck now receives (habitKey, dateString)
//             weekDates={weekDates} // Pass the specific dates for the week

//             tooltip={habit.tooltip}
//             completedDays={completed[habit.key] || {}}
//             onCheck={(day) => handleCompletion(habit.key, day)}
//             darkMode={darkMode}
//           />
//         ))}
//       </div>
//       <TreeGrowth completedCount={totalCompleted} />
//     </div>
//   );
// }

// export default HabitTrackerApp;


// //  ui-polish
// // import React, { useState } from "react";
// // import { useTranslation } from "react-i18next";

// // import TrackerCard from "./TrackerCard";
// // import TreeGrowth from "./TreeGrowth";
// //  ui-polish
// // import withI18nReady from "./withI18nReady";
// // import "../App.css";

// // function HabitTrackerApp() {
// //   const { t } = useTranslation();

// //   // Dark mode state
// //   const [darkMode, setDarkMode] = useState(() => {
// //     const savedTheme = localStorage.getItem("theme");
// //     return savedTheme === "dark";
// //   });

// //   // Habit completion state
// //   const [completed, setCompleted] = useState(() => {
// //     const saved = localStorage.getItem("completedHabits");
// //     return saved ? JSON.parse(saved) : {};
// //   });

// //   const habitList = [
// //     { key: "wakeUpTime", label: t("habits.wakeUpTime"), tooltip: t("tooltips.wakeUpTime") },
// //     { key: "waterIntake", label: t("habits.waterIntake"), tooltip: t("tooltips.waterIntake") },
// //     { key: "sleep", label: t("habits.sleep"), tooltip: t("tooltips.sleep") },
// //     { key: "meditation", label: t("habits.meditation"), tooltip: t("tooltips.meditation") },
// //     { key: "exercise", label: t("habits.exercise"), tooltip: t("tooltips.exercise") },
// //     { key: "healthyEating", label: t("habits.healthyEating"), tooltip: t("tooltips.healthyEating") },
// //     { key: "gratitude", label: t("habits.gratitude"), tooltip: t("tooltips.gratitude") },
// //     { key: "journaling", label: t("habits.journaling"), tooltip: t("tooltips.journaling") },
// //     { key: "screenTime", label: t("habits.screenTime"), tooltip: t("tooltips.screenTime") },
// //     { key: "study", label: t("habits.study"), tooltip: t("tooltips.study") },
// //     { key: "workout", label: t("habits.workout"), tooltip: t("tooltips.workout") },
// //     { key: "steps", label: t("habits.steps"), tooltip: t("tooltips.steps") },
// //     { key: "selfCare", label: t("habits.selfCare"), tooltip: t("tooltips.selfCare") },
// //     { key: "goalSetting", label: t("habits.goalSetting"), tooltip: t("tooltips.goalSetting") },
// //     { key: "skincare", label: t("habits.skincare"), tooltip: t("tooltips.skincare") },
// //   ];

// //   const toggleDarkMode = () => {
// //     setDarkMode((prev) => {
// //       localStorage.setItem("theme", !prev ? "dark" : "light");
// //       return !prev;
// //     });
// //   };

// //   const handleCompletion = (habitKey, day) => {
// //     setCompleted((prev) => {
// //       const updated = {
// //         ...prev,
// //         [habitKey]: {
// //           ...prev[habitKey],
// //           [day]: !prev[habitKey]?.[day],
// //         },
// //       };
// //       localStorage.setItem("completedHabits", JSON.stringify(updated));
// //       return updated;
// //     });
// //   };

// //   const resetWeek = () => {
// //     if (window.confirm("Are you sure you want to reset all habits for this week?")) {
// //       setCompleted({});
// //       localStorage.removeItem("completedHabits");
// //     }
// //   };

// //   const totalCompleted = Object.values(completed).reduce(
// //     (sum, days) => sum + Object.values(days).filter(Boolean).length,
// //     0
// //   );

// //   const totalPossible = habitList.length * 7;

// //   return (
// //     <div className={`app-container min-h-screen p-6 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
// //       {/* Header */}
// //       <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

// //       {/* Weekly Summary + Reset */}
// //       <div className="summary flex flex-col sm:flex-row justify-between items-center mb-6">
// //         <h2 className="text-xl font-semibold mb-2 sm:mb-0">
// //           Weekly Progress: {totalCompleted}/{totalPossible} completed
// //         </h2>
// //         <button
// //           onClick={resetWeek}
// //           className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
// //         >
// //           Reset Week
// //         </button>
// //       </div>

// //       {/* Habit Tracker Cards */}
// //       <main className="trackers grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// //         {habitList.map((habit) => (
// //           <TrackerCard
// //             key={habit.key}
// //             habit={habit.label}
// //  ui-polish
// //             tooltip={habit.tooltip}
// //             completedDays={completed[habit.key] || {}}
// //             onCheck={(day) => handleCompletion(habit.key, day)}
// //             darkMode={darkMode}

// //           />
// //         ))}
// //       </main>

// //       {/* Tree Growth visualization */}
// //       <div className="mt-10">
// //         <TreeGrowth completedCount={totalCompleted} />
// //       </div>
// //  ui-polish
// //     </div>

// //       <TreeGrowth completedCount={totalCompleted} />
// //     </div>
// //  main
// //   );
// // }

// // export default HabitTrackerApp;
