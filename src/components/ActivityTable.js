import PomodoroTimer from "./PomodoroTimer";

export default function ActivityTable({
  activities,
  startActivity,
  finishActivity,
}) {
  return (
    <table className="w-full border-collapse border border-gray-300 mt-6">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Start Time</th>
          <th className="border border-gray-300 px-4 py-2">End Time</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <td className="border border-gray-300 px-4 py-2">
              {activity.title}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {activity.start_time
                ? new Date(activity.start_time).toLocaleTimeString()
                : "Not started"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {activity.end_time
                ? new Date(activity.end_time).toLocaleTimeString()
                : "In progress"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
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
