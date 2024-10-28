import { useState } from "react";
import { supabase } from "../services/supabaseClient";

const InputField = ({ fetchActivities }) => {
  const [newActivity, setNewActivity] = useState("");

  const addActivity = async () => {
    if (newActivity.trim()) {
      const { error } = await supabase
        .from("activities")
        .insert([{ title: newActivity }]);

      if (error) {
        console.error("Error adding activity:", error);
        return;
      }

      setNewActivity("");
      fetchActivities();
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addActivity();
    }
  };

  return (
    <div className="input-container">
      <input
        className="input-field"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="New activity"
        onKeyDown={handleKeyDown} // Listen for key press events
      />
      <button onClick={addActivity} className="btn">
        Add Activity
      </button>
    </div>
  );
};

export default InputField;
