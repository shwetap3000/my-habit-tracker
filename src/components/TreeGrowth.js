import React from "react";
import { useTranslation } from "react-i18next";
import "./TreeGrowth.css";

function TreeGrowth({ completedCount }) {
  const { t, ready } = useTranslation(); // Add i18n support

  // Return null if translations aren't ready
  if (!ready) return null;

  const growthStage = Math.min(Math.floor(completedCount / 5), 5); // 0–5
  const treeEmojis = ["🌱", "🌿", "🌳", "🎄", "🌴", "🪴"];

  return (
    <div className="tree-container">
      {/* Use translated title */}
      <h2>{t("treeGrowth.title")}</h2>
      <div className="tree">{treeEmojis[growthStage]}</div>
      {/* Use translated text with count interpolation */}
      <p>{t("treeGrowth.habitsCompleted", { count: completedCount })}</p>
    </div>
  );
}

export default TreeGrowth;
