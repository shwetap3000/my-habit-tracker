import React from 'react';
import './TreeGrowth.css';

function TreeGrowth({ completedCount }) {
  const growthStage = Math.min(Math.floor(completedCount / 5), 5); // 0–5
  const treeEmojis = ['🌱', '🌿', '🌳', '🎄', '🌴', '🪴'];

  return (
    <div className="tree-container">
      <h2>Your Habit Tree</h2>
      <div className="tree">{treeEmojis[growthStage]}</div>
      <p>{completedCount} habits completed this week!</p>
    </div>
  );
}

export default TreeGrowth;