
import { Link } from "react-router-dom";
import { NotificationItem } from "../components/collapsableTable";

export default function FarmNotification({ notifications }) {
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formarted = new Intl.DateTimeFormat("en-US", options).format(date);
    return formarted;
   }

  return (
    <div className="w-full">
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
            Farm Recommendations
          </h2>
          <p className="text-emerald-100 text-sm mt-1">3 new updates</p>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {notifications?.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                recommendation={notification.recommendation}
                status={notification.priority}
                time={formatDate(notification.created_at)}
              />
            ))}
          </div>

          <Link
            to="/notifications"
            className="block mt-4 py-2 px-4 text-sm text-center text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors mx-auto"
          >
            View All Notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
