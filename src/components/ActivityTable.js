import { useState, useEffect } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function ActivityTable({
  activities,
  startActivity,
  finishActivity,
}) {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const newTimers = {};
    activities.forEach((activity) => {
      if (activity.start_time && !activity.end_time) {
        const startTime = new Date(activity.start_time).getTime();
        const endTime = startTime + 25 * 60 * 1000; // Example: 25 minutes Pomodoro timer
        const remainingTime = endTime - new Date().getTime();

        if (remainingTime > 0) {
          newTimers[activity.id] = remainingTime;
        } else {
          finishActivity(activity.id); // Automatically finish if time is up
        }
      }
    });
    setTimers(newTimers);
  }, [activities, finishActivity]);

  return (
    <table className="mt-6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <td>{activity.title}</td>
            <td>
              {activity.start_time
                ? new Date(activity.start_time).toLocaleTimeString()
                : "Not started"}
            </td>
            <td>
              {activity.end_time
                ? new Date(activity.end_time).toLocaleTimeString()
                : "In progress"}
            </td>
            <td>
              {!activity.start_time ? (
                <button
                  onClick={() => startActivity(activity.id)}
                  className="btn btn-green"
                >
                  Start
                </button>
              ) : activity.end_time ? (
                "Finished"
              ) : (
                <div className="flip-timer-container">
                  {timers[activity.id] && (
                    <FlipClockCountdown
                      to={new Date().getTime() + timers[activity.id]}
                      className="flip-clock"
                      showLabels={false}
                      showSeparators={true}
                      onFinish={() => finishActivity(activity.id)}
                    />
                  )}
                  <button
                    onClick={() => finishActivity(activity.id)}
                    className="btn btn-red"
                  >
                    Finish
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
