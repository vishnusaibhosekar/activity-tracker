import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import Header from "./components/Header";
import ActivityTable from "./components/ActivityTable";

/* Import global and component styles */
import "./styles/global.css";
import "./styles/buttons.css";
import "./styles/input.css";
import "./styles/table.css";

function App() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Apply theme-specific CSS on initial load and when darkMode changes
  useEffect(() => {
    const theme = darkMode ? "dark-theme.css" : "light-theme.css";
    import(`./styles/${theme}`);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch activities on mount and set up real-time listener
  useEffect(() => {
    fetchActivities();

    const channel = supabase
      .channel("activities-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activities" },
        fetchActivities
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Clean up listener on unmount
    };
  }, []);

  // Fetch activities from Supabase
  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching activities:", error);
      return;
    }

    setActivities(data);
  };

  // Add a new activity to the list
  const addActivity = async () => {
    if (newActivity.trim()) {
      const { error } = await supabase
        .from("activities")
        .insert([{ title: newActivity }]);

      if (error) {
        console.error("Error adding activity:", error);
        return;
      }

      setNewActivity(""); // Clear input field
      fetchActivities(); // Refresh the list
    }
  };

  // Start an activity (sets start time)
  const startActivity = async (id) => {
    const { error } = await supabase
      .from("activities")
      .update({ start_time: new Date() })
      .eq("id", id);

    if (error) {
      console.error("Error starting activity:", error);
      return;
    }

    fetchActivities(); // Refresh the list
  };

  // Finish an activity (sets end time and marks as completed)
  const finishActivity = async (id) => {
    const { error } = await supabase
      .from("activities")
      .update({
        end_time: new Date(),
        completed: true,
      })
      .eq("id", id);

    if (error) {
      console.error("Error finishing activity:", error);
      return;
    }

    fetchActivities(); // Refresh the list
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="input-container">
        <input
          className="input-field"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="New activity"
        />
        <button onClick={addActivity} className="add-button">
          Add Activity
        </button>
      </div>

      <ActivityTable
        activities={activities}
        startActivity={startActivity}
        finishActivity={finishActivity}
      />
    </div>
  );
}

export default App;
