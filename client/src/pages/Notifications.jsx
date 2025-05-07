import { useState, useEffect } from "react";
import { FiBell, FiX } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useNotify } from "../store/hooks/useNotify";

const Notifications = () => {
  const {
    notifications,
    loading,
    error,
    markAsRead,
    getNotifications,
    deleteNotification,
  } = useNotify();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);

    if (!notification.is_read) {
      markAsRead(notification.id);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [showModal]);

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto p-4 sm:p-6 lg:max-w-4xl ">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiBell className="h-6 w-6 mr-2 text-indigo-600" />
              Notifications
            </h1>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications?.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    notification.is_read
                      ? "bg-white border border-gray-200"
                      : "bg-indigo-50 border border-indigo-100"
                  } hover:shadow-sm`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-start">
                      <span
                        className={`h-3 w-3 rounded-full mt-1 mr-3 sm:mr-4 flex-shrink-0 ${
                          notification.is_read
                            ? "bg-green-500"
                            : "bg-indigo-500"
                        }`}
                      ></span>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 line-clamp-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap sm:self-start">
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notification Detail Modal - Responsive */}
        {showModal && selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedNotification.title}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mb-4 gap-1 sm:gap-4">
                  <span>{selectedNotification.time}</span>
                  <span className="capitalize">
                    {selectedNotification.type}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 sm:p-4 rounded-md mb-6">
                  <p className="text-gray-700">
                    {selectedNotification.message}
                  </p>
                </div>

                <div className="flex  sm:flex-row justify-between gap-3 sm:gap-0">
                  <div className="flex justify-end sm:justify-start">
                    <button
                      onClick={() => {
                        deleteNotification(selectedNotification.id);
                        setShowModal(false);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default Notifications;
