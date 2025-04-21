import {NotificationItem} from "../components/NotificatioItem";


export default function FarmNotification() {
  const notifications = [
    {
      id: 1,
      title: "Irrigation System Alert",
      content: (
        <div>
          <p className="mb-2">
            The irrigation system in Zone 4 has reported low water pressure.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Location: North Field</li>
            <li>Device ID: IRR-0452</li>
            <li>Last normal reading: 2 hours ago</li>
          </ul>
        </div>
      ),
      status: "alert",
      time: "10 min ago",
    },
    {
      id: 2,
      title: "Soil Moisture Recommendation",
      content: (
        <div>
          <p className="mb-2">
            Optimal watering time detected for Almond trees.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <p className="text-xs text-gray-500">Current Moisture</p>
              <p className="font-medium">32%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Recommended</p>
              <p className="font-medium">40-45%</p>
            </div>
          </div>
        </div>
      ),
      status: "normal",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Harvest Ready",
      content: (
        <div>
          <p className="mb-2">
            Your almond crop in Section B has reached optimal harvest time.
          </p>
          <div className="bg-green-50 p-3 rounded-md mt-2">
            <p className="text-sm font-medium text-green-800">
              Estimated yield: 2.3 tons/acre
            </p>
          </div>
        </div>
      ),
      status: "success",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="min-w-md w-1/2">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
          <h2 className="text-white text-lg font-semibold flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Farm Notifications
          </h2>
          <p className="text-emerald-100 text-sm mt-1">3 new updates</p>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                content={notification.content}
                status={notification.status}
                time={notification.time}
              />
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-sm text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
