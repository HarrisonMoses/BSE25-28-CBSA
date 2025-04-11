"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo";
import { useAuth } from "../store/hooks/useAuth";
import { useFarm } from "../store/hooks/useFarm";

const Sidebar = ({children}) => {
  const location = useLocation();
  const { logout } = useAuth();
  const {farms} = useFarm()
  const [farmsDropdownOpen, setFarmsDropdownOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-100" : "";
  };

  const toggleFarmsDropdown = () => {
    setFarmsDropdownOpen(!farmsDropdownOpen);
  };

 
  return (
    <div className="flex flex-col sm:flex-row">
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="flex items-center mb-5 pl-2.5">
            <Logo />
            <span className="ml-2 text-xl font-semibold text-indigo-600">
              AgriSense
            </span>
            <div className="items-center space-x-4">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </div>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${isActive(
                  "/"
                )}`}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                  location.pathname.includes("/farms") ? "bg-gray-100" : ""
                }`}
                onClick={toggleFarmsDropdown}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z" />
                </svg>
                <span className="flex-1 ms-3 text-left">Farms</span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    farmsDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                className={`py-2 space-y-2 ${
                  farmsDropdownOpen ? "block" : "hidden"
                }`}
              >
                {farms?.map((farm) => (
                  <li key={farm.farm_id} className="first-letter:capitalize">
                    <Link
                      to={`farms/${farm.farm_id}`}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 first-letter:capitalize"
                    >
                      {farm.name} Farm
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/devices"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${isActive(
                  "/devices"
                )}`}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M360-360v-240h240v240H360Zm80-80h80v-80h-80v80Zm-80 320v-80h-80q-33 0-56.5-23.5T200-280v-80h-80v-80h80v-80h-80v-80h80v-80q0-33 23.5-56.5T280-760h80v-80h80v80h80v-80h80v80h80q33 0 56.5 23.5T760-680v80h80v80h-80v80h80v80h-80v80q0 33-23.5 56.5T680-200h-80v80h-80v-80h-80v80h-80Zm320-160v-400H280v400h400ZM480-480Z" />
                </svg>
                <span className="ms-3">Device Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/advisor"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${isActive(
                  "/advisor"
                )}`}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
                </svg>
                <span className="ms-3">AI Advisor</span>
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${isActive(
                  "/notifications"
                )}`}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="ms-3">Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${isActive(
                  "/login"
                )}`}
                onClick={() => {
                  logout();
                }} // Call the logout function when the link is clicked
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                <span className="ms-3">Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <section className="bg-gray-50 h-screen w-screen ">{children}</section>
    </div>
  );
};

export default Sidebar;
