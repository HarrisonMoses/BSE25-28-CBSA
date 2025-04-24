import { useState,useEffect } from "react";
import {
  FiBell,
  FiX,
  } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import {useNotify} from "../store/hooks/useNotify";

const Notifications = () => {

  const { notifications, loading, error,markAsRead, getNotifications, deleteNotification } = useNotify();

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);

    // Mark as read
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
  };

  useEffect(() => {
    
      getNotifications();
    
  },[showModal]);

  

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50">
        <div className="w-max mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiBell className="h-6 w-6 mr-2 text-indigo-600" />
              Notifications
            </h1>
            <button
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Mark all as read
            </button>
          </div>

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
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    notification.is_read
                      ? "bg-white border border-gray-200"
                      : "bg-indigo-50 border border-indigo-100"
                  } hover:shadow-sm`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <span
                        className={`h-3 w-3 rounded-full mt-1 mr-4 flex-shrink-0 ${
                          notification.is_read ? "bg-green-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600  max-w-md">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      10 min ago
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notification Detail Modal */}
        {showModal && selectedNotification && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="p-6">
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

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{selectedNotification.time}</span>
                  
                  <span className="capitalize">
                    {selectedNotification.type}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-gray-700">
                    {selectedNotification.message}
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => { deleteNotification(selectedNotification.id); setShowModal(false); }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                  <div className="flex space-x-3">
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
