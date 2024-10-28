import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import Header from "./components/Header";
import ActivityTable from "./components/ActivityTable";
import AddActivity from "./components/AddActivity"; // Import new component

/* Import all styles globally */
import "./styles/global.css";
import "./styles/buttons.css";
import "./styles/input.css";
import "./styles/table.css";
import "./styles/header.css";
import "./styles/light-theme.css";
import "./styles/dark-theme.css";

function App() {
  const [activities, setActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Sync the theme class with the <body> element for global effect
  useEffect(() => {
    const body = document.body;

    if (darkMode) {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }

    console.log(`Current Theme: ${darkMode ? "Dark Mode" : "Light Mode"}`);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
      supabase.removeChannel(channel);
    };
  }, []);

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

  const addActivity = async (title) => {
    const { error } = await supabase.from("activities").insert([{ title }]);

    if (error) {
      console.error("Error adding activity:", error);
      return;
    }

    fetchActivities();
  };

  const startActivity = async (id) => {
    const { error } = await supabase
      .from("activities")
      .update({ start_time: new Date() })
      .eq("id", id);

    if (error) {
      console.error("Error starting activity:", error);
      return;
    }

    fetchActivities();
  };

  const finishActivity = async (id) => {
    const { error } = await supabase
      .from("activities")
      .update({ end_time: new Date(), completed: true })
      .eq("id", id);

    if (error) {
      console.error("Error finishing activity:", error);
      return;
    }

    fetchActivities();
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <AddActivity addActivity={addActivity} /> {/* Use new component */}
      <ActivityTable
        activities={activities}
        startActivity={startActivity}
        finishActivity={finishActivity}
      />
    </div>
  );
}

export default App;
