import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Header.css";

function Header({ toggleDarkMode, darkMode }) {
  const { t, ready } = useTranslation();

  // Return null if translations aren't ready
  if (!ready) return null;

  return (
    <div className="header">
      <h1>{t("header.title")}</h1>
      <div className="header-controls">
        <LanguageSwitcher />
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? t("header.lightMode") : t("header.darkMode")}
        </button>
      </div>
    </div>
  );
}

export default Header;
