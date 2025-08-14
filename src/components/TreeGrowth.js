import React from "react";
import { useTranslation } from "react-i18next";

function TreeGrowth({ completedCount, darkMode }) {
  const { t, ready } = useTranslation();
  if (!ready) return null;

  const growthStage = Math.min(Math.floor(completedCount / 5), 5);
  const treeEmojis = ["🌱", "🌿", "🌳", "🎄", "🌴", "🪴"];

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        borderRadius: "1rem",
        boxShadow: darkMode
          ? "0 4px 12px rgba(255,255,255,0.05)"
          : "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#f9fafb" : "#111827",
        textAlign: "center",
        maxWidth: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
        {t("treeGrowth.title")}
      </h2>
      <div
        style={{
          fontSize: `${2 + growthStage * 0.5}rem`,
          transition: "font-size 0.3s ease",
          marginBottom: "1rem",
        }}
      >
        {treeEmojis[growthStage]}
      </div>
      <p style={{ fontSize: "0.95rem", color: darkMode ? "#d1d5db" : "#555" }}>
        {t("treeGrowth.habitsCompleted", { count: completedCount })}
      </p>

      {/* Optional progress bar */}
      <div
        style={{
          height: "0.5rem",
          width: "100%",
          backgroundColor: darkMode ? "#333" : "#e0e0e0",
          borderRadius: "9999px",
          overflow: "hidden",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            width: `${Math.min((completedCount / 35) * 100, 100)}%`,
            height: "100%",
            backgroundColor: "#22c55e",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

export default TreeGrowth;
