import React, { useState, useEffect } from 'react';
import './MonthlySummary.css'; // We will update this CSS file next

const MonthlySummary = ({ habitList, completedData }) => {
    // State to keep track of the currently displayed month
    const [currentDate, setCurrentDate] = useState(new Date());
    // State to hold the calculated summary data
    const [summaryData, setSummaryData] = useState([]);

    // This effect recalculates the summary whenever the date or habit data changes
    useEffect(() => {
        const calculateSummary = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const monthlyStats = habitList.map(habit => {
                const habitCompletions = completedData[habit.key] || {};
                let completedCount = 0;
                let longestStreak = 0;
                let currentStreak = 0;

                // Loop through each day of the selected month
                for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    
                    if (habitCompletions[dateStr]) {
                        completedCount++;
                        currentStreak++;
                    } else {
                        if (currentStreak > longestStreak) {
                            longestStreak = currentStreak;
                        }
                        currentStreak = 0;
                    }
                }

                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }

                const completionPercentage = daysInMonth > 0 ? ((completedCount / daysInMonth) * 100).toFixed(0) : 0;

                return {
                    key: habit.key,
                    label: habit.label,
                    completedCount,
                    longestStreak,
                    completionPercentage,
                    missedDays: daysInMonth - completedCount,
                };
            });

            setSummaryData(monthlyStats);
        };

        calculateSummary();
    }, [currentDate, habitList, completedData]);

    // Functions to navigate between months
    const goToPreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };
    
    const totalHabitsCompletedInMonth = summaryData.reduce((acc, habit) => acc + habit.completedCount, 0);

    // --- NEW: EXPORT FUNCTIONALITY ---

    // Helper function to calculate the all-time longest streak for a habit
    const calculateAllTimeLongestStreak = (habitCompletions) => {
        const dates = Object.keys(habitCompletions).filter(date => habitCompletions[date]).sort();
        if (dates.length === 0) return 0;

        let longestStreak = 1;
        let currentStreak = 1;

        for (let i = 1; i < dates.length; i++) {
            const currentDate = new Date(dates[i]);
            const prevDate = new Date(dates[i - 1]);
            
            const diffTime = Math.abs(currentDate - prevDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                currentStreak++;
            } else {
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
                currentStreak = 1;
            }
        }

        return Math.max(longestStreak, currentStreak);
    };

    // Prepares data for export
    const prepareExportData = () => {
        return habitList.map(habit => {
            const completions = completedData[habit.key] || {};
            const completedDates = Object.keys(completions).filter(date => completions[date]).sort();
            const longestStreak = calculateAllTimeLongestStreak(completions);

            return {
                habitName: habit.label,
                completedDates: completedDates,
                allTimeLongestStreak: longestStreak
            };
        });
    };

    // Generic download handler
    const downloadFile = (content, fileName, contentType) => {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    // Handles JSON export
    const handleExportJSON = () => {
        const exportData = prepareExportData();
        const jsonString = JSON.stringify(exportData, null, 2);
        downloadFile(jsonString, 'habit-data.json', 'application/json');
    };

    // Handles CSV export
    const handleExportCSV = () => {
        const exportData = prepareExportData();
        let csvContent = "Habit,TotalCompletions,AllTimeLongestStreak,CompletedDates\n";
        
        exportData.forEach(habit => {
            const datesString = `"${habit.completedDates.join(', ')}"`;
            csvContent += `${habit.habitName},${habit.completedDates.length},${habit.allTimeLongestStreak},${datesString}\n`;
        });

        downloadFile(csvContent, 'habit-data.csv', 'text/csv');
    };


    return (
        <div className="monthly-summary-container">
            {/* ... (existing month navigator and summary grid code) ... */}
            <h2>Monthly Summary</h2>
            <div className="month-navigator">
                <button onClick={goToPreviousMonth}>&lt; Previous</button>
                <h3>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={goToNextMonth}>Next &gt;</button>
            </div>
            
            <div className="total-completion-banner">
                Total Habits Completed This Month: <strong>{totalHabitsCompletedInMonth}</strong>
            </div>

            <div className="summary-grid">
                {summaryData.map(habit => (
                    <div key={habit.key} className="summary-card">
                        <h4>{habit.label}</h4>
                        <p>Completion: <strong>{habit.completionPercentage}%</strong></p>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar" 
                                style={{ width: `${habit.completionPercentage}%` }}
                            ></div>
                        </div>
                        <div className="stats-row">
                            <span>Completions: <strong>{habit.completedCount}</strong></span>
                            <span>Longest Streak: <strong>{habit.longestStreak} days</strong></span>
                            <span>Missed Days: <strong>{habit.missedDays}</strong></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- NEW: EXPORT SECTION --- */}
            <div className="export-section">
                <h2>Export Your Data</h2>
                <p>Download all of your habit data in JSON or CSV format.</p>
                <div className="export-buttons">
                    <button onClick={handleExportJSON}>Export as JSON</button>
                    <button onClick={handleExportCSV}>Export as CSV</button>
                </div>
            </div>
        </div>
    );
};

export default MonthlySummary;