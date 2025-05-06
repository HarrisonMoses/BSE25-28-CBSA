"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../hooks/axiosConfigs/intercepters";

import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { useFarm } from "../store/hooks/useFarm";
import { useNotify } from "../store/hooks/useNotify";
import FarmNotification from "./FarmNotifications";
import NutrientsChart from "../components/NutrientChat";
import MoistureChart from "../components/MoistureChart";
// P9$y#F5x!b&


const FarmDetails = () => {
  const { farm_id } = useParams();
  const navigate = useNavigate();
  const [SoilData, setSoilData] = useState(null);
  const [farmName, setFarmName] = useState('');
  const { getFarms, deleteFarm, farms } = useFarm();
  const [FarmNotifications, setFarmNotifications] = useState([]);
  const { notifications, getNotifications } = useNotify();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const farmSoilData = async (farmId) => {
    try {
      const res = await api.get(`api/farms/${farmId}/data/`);
      const result = Object.assign({}, ...res.data);
      setSoilData(result);
    } catch (error) {
      console.error("Error fetching farm data:", error);
    }
  };


 useEffect(() => {
   const fetchData = async () => {
     if (farms.length === 0) {
       await getFarms(); // wait for farms
     }
     if (notifications.length === 0) {
       await getNotifications(); // wait for notifications
     }

     if (farms.length > 0) {
       const farm = farms.filter((f) => f.farm_id === parseInt(farm_id));
       setFarmName(farm[0]?.name);
     } 
      
    
     if (Array.isArray(notifications) && notifications.length > 0) {
       const filtered = notifications.filter(
         (n) => n.farm === parseInt(farm_id)
       );
       setFarmNotifications(filtered);
     }

     await farmSoilData(farm_id);
   };

   fetchData();
 }, [notifications,farms, farm_id]);
  



  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };




  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteFarm(farm_id);
      setIsDeleteModalOpen(false);
      navigate("/"); // Redirect to dashboard after deletion
    } catch (error) {
      console.error("Error deleting farm:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Sidebar>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-4 sm:ml-64">
          {/* <Header /> */}

          <div className="mb-6 mt-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 first-letter:capitalize">
              { farmName } Farm Dashboard
            </h1>
            <div className="flex space-x-3">
              <Button
                name="Delete Farm"
                action={handleDeleteClick}
                variant="primary"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                }
              />
              {/* <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 6a6 6 0 100-12 6 6 0 000 12zm1-5a1 1 0 11-2 0 1 1 0 012 0zm-3-4a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"></path>
                </svg>
                AI Advisor
              </button> */}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
              type="soil_moisture"
              label="Soil Moisture"
              value={SoilData?.moisture_level}
              unit="%"
            />
            <MetricCard
              type="temperature"
              label="Temperature"
              value={SoilData?.temperature}
              unit="°C"
            />
            <MetricCard
              type="nitrogen"
              label="Nitrogen"
              value={SoilData?.nitrogen}
              unit="mg/kg"
            />
            <MetricCard
              type="Phosphorus"
              label="Phosphorus"
              value={SoilData?.phosphorous}
              unit="mg/kg"
            />
            <MetricCard
              type="Potassium"
              label="Potassium"
              value={SoilData?.potassium}
              unit="mg/kg"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Nutrient Trends</h2>
              <div className="h-64 flex items-center justify-center">
                <NutrientsChart/>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Soil Moisture Trend
              </h2>
              <div className="h-64 flex items-center justify-center">
                <MoistureChart/>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FarmNotification
            notifications={FarmNotifications}
            /> 
          </div>

          {/* AI Chat */}
          {/* <ChatBox
            title="AI AgriSense"
            initialMessage="Hello! I'm your AI Soil Advisor. How can I help you today with your soil management?"
          /> */}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="p-4">
          <p className="mb-4 text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{farmName} Farm</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <Button
              name={isDeleting ? "Deleting..." : "Delete Farm"}
              action={handleDeleteConfirm}
              variant="primary"
              disabled={isDeleting}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
      </Modal>
    </Sidebar>
  );
};

export default FarmDetails;
