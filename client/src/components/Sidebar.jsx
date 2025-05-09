import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo";
import { useAuth } from "../store/hooks/useAuth";
import { useFarm } from "../store/hooks/useFarm";
import {
  FiHome,
  FiLayers,
  FiAlertCircle,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";
import FarmLink from "../components/farmlink";
import { useNotify } from "../store/hooks/useNotify";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { farms } = useFarm();
  const{notifications} = useNotify();
  const [farmsDropdownOpen, setFarmsDropdownOpen] = useState(false);
  const [UnreadNotification, setUnreadNotification] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) {
        setSidebarOpen(false);
      }
    };

    const unreadNotifications = notifications.filter(
      (notification) => !notification.is_read
    )
    setUnreadNotification(unreadNotifications.length);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-indigo-50 text-indigo-600"
      : "text-gray-700";
  };

  const toggleFarmsDropdown = () => {
    setFarmsDropdownOpen(!farmsDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm p-4 flex items-center justify-between sm:hidden">
          <button onClick={toggleSidebar} className="text-gray-600">
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className="flex items-center">
            <Logo className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold text-indigo-600">
              AgriSense
            </span>
          </div>
          <div className="relative">
            <FiAlertCircle size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-20 w-64 h-screen transition-transform bg-white border-r-2 border-amber-700 
          ${
            sidebarOpen ? "translate-x-0 " : "-translate-x-full"
          } sm:translate-x-0`}
      >
        <div className="h-full px-4 py-6 overflow-y-auto flex flex-col">
          {/* Logo and close button (mobile) */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center">
              <Logo className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-indigo-600">
                AgriSense
              </span>
            </div>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-gray-500 sm:hidden"
              >
                <FiX size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-indigo-50 hover:text-indigo-600 ${isActive(
                    "/"
                  )}`}
                >
                  <FiHome className="w-5 h-5" />
                  <span className="ml-3 font-medium">Dashboard</span>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors hover:bg-indigo-50 hover:text-indigo-600 ${
                    location.pathname.includes("/farms")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700"
                  }`}
                  onClick={toggleFarmsDropdown}
                >
                  <div className="flex items-center">
                    <FiLayers className="w-5 h-5" />
                    <span className="ml-3 font-medium">Farms</span>
                  </div>
                  {farmsDropdownOpen ? (
                    <FiChevronDown className="w-4 h-4" />
                  ) : (
                    <FiChevronRight className="w-4 h-4" />
                  )}
                </button>
                <ul
                  className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                    farmsDropdownOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {Array.isArray(farms) && farms.length > 0 ? (
                    farms.map((farm) => (
                      <li key={farm.farm_id}>
                        <FarmLink farm={farm} />
                      </li>
                    ))
                  ) : (
                    <li>
                      <span className="flex items-center p-3 text-gray-500">
                        <span className="ml-6">No farms available</span>
                      </span>
                    </li>
                  )}
                </ul>
              </li>

              <li>
                <Link
                  to="/devices"
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-indigo-50 hover:text-indigo-600 ${isActive(
                    "/devices"
                  )}`}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M360-360v-240h240v240H360Zm80-80h80v-80h-80v80Zm-80 320v-80h-80q-33 0-56.5-23.5T200-280v-80h-80v-80h80v-80h-80v-80h80v-80q0-33 23.5-56.5T280-760h80v-80h80v80h80v-80h80v80h80q33 0 56.5 23.5T760-680v80h80v80h-80v80h80v80h-80v80q0 33-23.5 56.5T680-200h-80v80h-80v-80h-80v80h-80Zm320-160v-400H280v400h400ZM480-480Z" />
                  </svg>
                  <span className="ml-3 font-medium">Device Management</span>
                </Link>
              </li>

              {/* <li>
                <Link
                  to="/advisor"
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-indigo-50 hover:text-indigo-600 ${isActive(
                    "/advisor"
                  )}`}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
                  </svg>
                  <span className="ml-3 font-medium">AI Advisor</span>
                </Link>
              </li> */}

              <li>
                <Link
                  to="/notifications"
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-indigo-50 hover:text-indigo-600 ${isActive(
                    "/notifications"
                  )}`}
                >
                  <div className="relative">
                    <svg
                      className="w-5 h-5"
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
                    <span className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${UnreadNotification === 0? "bg-green-500": "bg-red-500"}`}></span>
                  </div>
                  <span className="ml-3 font-medium">Notifications</span>
                  {UnreadNotification > 0 && (
                    <span className="ml-3 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {UnreadNotification}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Bottom section - Logout */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 overflow-auto transition-all duration-200 ${
          sidebarOpen ? "sm:ml-2" : "sm:ml-0"
        } ${isMobile ? "mt-16" : ""}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
