// src/PomodoroTimer.js
import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  // Timer effect to decrease time every second when active
  useEffect(() => {
    let timer;
    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      clearInterval(timer);
      notifyUser(
        onBreak
          ? "Break Over! Get back to work."
          : "Pomodoro Complete! Take a break."
      );
      toggleBreak();
    }
    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  // Function to start or stop the timer
  const toggleTimer = () => setIsActive((prev) => !prev);

  // Toggle between work and break sessions
  const toggleBreak = () => {
    setOnBreak((prev) => !prev);
    setSecondsLeft(onBreak ? 1500 : 300); // 25 min or 5 min break
  };

  // Notification function
  const notifyUser = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message);
    }
  };

  // Request notification permission on load
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{onBreak ? "Break Time!" : "Pomodoro Timer"}</h1>
      <h2>{formatTime(secondsLeft)}</h2>
      <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
      <button onClick={toggleBreak}>
        Switch to {onBreak ? "Work" : "Break"}
      </button>
    </div>
  );
};

export default PomodoroTimer;
