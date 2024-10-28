import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import Header from "./components/Header";
import ActivityTable from "./components/ActivityTable";
import InputField from "./components/InputField";

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
    body.classList.toggle("dark", darkMode);
    body.classList.toggle("light", !darkMode);
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

  const takeBreak = async (id) => {
    const { error } = await supabase
      .from("activities")
      .update({
        on_break: true,
        paused_at: new Date(), // Store when the activity was paused
      })
      .eq("id", id);

    if (error) {
      console.error("Error taking break:", error);
      return;
    }
    fetchActivities(); // Refresh the activity list
  };

  const resumeActivity = async (id) => {
    const { error } = await supabase
      .from("activities")
      .update({
        on_break: false,
      })
      .eq("id", id);

    if (error) {
      console.error("Error resuming activity:", error);
      return;
    }
    fetchActivities(); // Refresh the activity list
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
      <InputField fetchActivities={fetchActivities} />
      <ActivityTable
        activities={activities}
        startActivity={startActivity}
        finishActivity={finishActivity}
        takeBreak={takeBreak}
        resumeActivity={resumeActivity}
      />
    </div>
  );
}

export default App;
