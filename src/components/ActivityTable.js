import PomodoroTimer from "./PomodoroTimer";

export default function ActivityTable({
  activities,
  startActivity,
  finishActivity,
}) {
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
                <>
                  <PomodoroTimer />
                  <button
                    onClick={() => finishActivity(activity.id, activity.title)}
                    className="btn btn-red"
                  >
                    Finish
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
