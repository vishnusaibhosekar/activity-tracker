import React, { useState } from "react";

export default function AddActivity({ addActivity }) {
  const [newActivity, setNewActivity] = useState("");

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      addActivity(newActivity);
      setNewActivity(""); // Clear input field after adding
    }
  };

  return (
    <div className="input-container">
      <input
        className="input-field"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="New activity"
      />
      <button onClick={handleAddActivity} className="btn btn-green">
        Add Activity
      </button>
    </div>
  );
}
