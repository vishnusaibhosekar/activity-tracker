import { useEffect, useState } from "react";

export default function PomodoroTimer() {
  const FOCUS_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  const handleTimerEnd = () => {
    setIsBreak(!isBreak);
    setSecondsLeft(isBreak ? FOCUS_TIME : BREAK_TIME);
    setIsActive(false);
    new Notification("Pomodoro Session", {
      body: isBreak ? "Back to work!" : "Take a break!",
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="pomodoro-timer">
      <span className="timer-display">{formatTime(secondsLeft)}</span>
      <button onClick={() => setIsActive(!isActive)} className="btn btn-blue">
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={handleTimerEnd} className="btn btn-gray">
        {isBreak ? "Switch to Work" : "Switch to Break"}
      </button>
    </div>
  );
}
