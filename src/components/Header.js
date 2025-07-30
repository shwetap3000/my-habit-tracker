import React from 'react';
import './Header.css';

function Header({ toggleDarkMode, darkMode }) {
  return (
    <div className="header">
      <h1>🌸 My Weekly Habit Tracker</h1>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default Header;