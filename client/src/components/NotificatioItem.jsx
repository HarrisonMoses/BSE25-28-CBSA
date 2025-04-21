import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

export const NotificationItem = ({ title, content, status, time }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusIcons = {
    alert: <FiAlertCircle className="text-yellow-500 mr-2" />,
    normal: <FiInfo className="text-blue-500 mr-2" />,
    success: <FiCheckCircle className="text-green-500 mr-2" />,
  };

  return (
    <div className="mb-2 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`p-4 cursor-pointer flex justify-between items-center 
          ${
            status === "alert"
              ? "bg-yellow-50"
              : status === "success"
              ? "bg-green-50"
              : "bg-gray-50"
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {statusIcons[status]}
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-3">{time}</span>
          {isOpen ? (
            <FiChevronDown className="text-gray-500" />
          ) : (
            <FiChevronRight className="text-gray-500" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="text-sm text-gray-600">{content}</div>
        </div>
      )}
    </div>
  );
};
