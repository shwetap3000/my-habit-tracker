import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Header.css";

function Header({ toggleDarkMode, darkMode }) {
  const { t, ready } = useTranslation();

  // Return null if translations aren't ready
  if (!ready) return null;

return (
  <header className="header headerDisplay">
    {/* Title */}
    <h1>{t("header.title")}</h1>

    {/* Controls: Language switcher and dark mode toggle */}
    <div className="header-controls">
      <LanguageSwitcher />
      <button
        className="mode-toggle toggleTransition"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {darkMode ? t("header.lightMode") : t("header.darkMode")}
      </button>
    </div>
  </header>
);

}

export default Header;
