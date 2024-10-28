import React, { useState, useEffect } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function ActivityTable({
  activities,
  startActivity,
  finishActivity,
  takeBreak,
  resumeActivity,
}) {
  const [expandedActivities, setExpandedActivities] = useState([]);
  const [timers, setTimers] = useState({});

  // Sync timers with activities from the database
  useEffect(() => {
    const syncedTimers = activities.reduce((acc, activity) => {
      if (activity.start_time && !activity.end_time) {
        acc[activity.id] = calculateRemainingTime(activity);
      }
      return acc;
    }, {});
    setTimers(syncedTimers);
  }, [activities]);

  const calculateRemainingTime = (activity) => {
    const now = new Date();
    const elapsedTime = activity.paused_at
      ? new Date(activity.paused_at) - new Date(activity.start_time)
      : now - new Date(activity.start_time);
    const totalDuration = 25 * 60 * 1000; // 25 minutes

    const remainingTime = totalDuration - elapsedTime;
    return remainingTime > 0 ? remainingTime : 0;
  };

  const toggleTimer = (id) => {
    setExpandedActivities((prev) =>
      prev.includes(id)
        ? prev.filter((activityId) => activityId !== id)
        : [...prev, id]
    );
  };

  const handleTakeBreak = async (id) => {
    await takeBreak(id);
    setTimers((prev) => ({
      ...prev,
      [id]: calculateRemainingTime(activities.find((act) => act.id === id)),
    }));
  };

  const handleResumeActivity = async (id) => {
    await resumeActivity(id);
    showTimer(id); // Show timer when resuming the activity
  };

  const handleFinishActivity = async (id) => {
    await finishActivity(id);
    hideTimer(id); // Hide timer after finishing the activity
  };

  const hideTimer = (id) => {
    setExpandedActivities((prev) =>
      prev.filter((activityId) => activityId !== id)
    );
  };

  const showTimer = (id) => {
    setExpandedActivities((prev) => [...prev, id]);
  };

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
          <React.Fragment key={activity.id}>
            <tr>
              <td>{activity.title}</td>
              <td>
                {activity.start_time
                  ? new Date(activity.start_time).toLocaleTimeString()
                  : "Not started"}
              </td>
              <td>
                {activity.end_time
                  ? new Date(activity.end_time).toLocaleTimeString()
                  : activity.on_break
                  ? "On Break"
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
                  <>
                    {!activity.on_break ? (
                      <button
                        onClick={() => handleTakeBreak(activity.id)}
                        className="btn btn-gray"
                      >
                        Take Break
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResumeActivity(activity.id)}
                        className="btn btn-blue"
                      >
                        Resume
                      </button>
                    )}
                    <button
                      onClick={() => handleFinishActivity(activity.id)}
                      className="btn btn-red"
                    >
                      Finish
                    </button>
                    <button
                      onClick={() => toggleTimer(activity.id)}
                      className="btn btn-blue"
                    >
                      {expandedActivities.includes(activity.id)
                        ? "Hide Timer"
                        : "Show Timer"}
                    </button>
                  </>
                )}
              </td>
            </tr>
            {expandedActivities.includes(activity.id) && (
              <tr>
                <td colSpan="4" className="timer-container">
                  {timers[activity.id] > 0 ? (
                    <FlipClockCountdown
                      to={Date.now() + timers[activity.id]}
                      className="flip-timer"
                      onComplete={() => handleFinishActivity(activity.id)}
                      key={activity.id} // Force re-render for accurate time tracking
                    />
                  ) : (
                    <span>Activity Completed</span>
                  )}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
