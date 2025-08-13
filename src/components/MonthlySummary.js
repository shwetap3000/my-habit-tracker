import React, { useState, useEffect } from 'react';
import './MonthlySummary.css'; // We will create this CSS file next

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
                let missedDays = 0;

                // Loop through each day of the selected month
                for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    
                    if (habitCompletions[dateStr]) {
                        completedCount++;
                        currentStreak++;
                    } else {
                        // If the day was missed, reset the streak
                        if (currentStreak > longestStreak) {
                            longestStreak = currentStreak;
                        }
                        currentStreak = 0;
                        missedDays++;
                    }
                }

                // Final check for streak at the end of the month
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
                    missedDays: daysInMonth - completedCount, // Correctly calculate missed days
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

    return (
        <div className="monthly-summary-container">
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
        </div>
    );
};

export default MonthlySummary;
