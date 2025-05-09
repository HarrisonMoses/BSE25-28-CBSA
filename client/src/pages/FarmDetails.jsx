"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../hooks/axiosConfigs/intercepters";
import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { useFarm } from "../store/hooks/useFarm";
import { useNotify } from "../store/hooks/useNotify";
import FarmNotification from "./FarmNotifications";
import NutrientsChart from "../components/NutrientChat";
import MoistureChart from "../components/MoistureChart";
import CropRecommendation from "../components/cropRecommendation";
import { GetCrops,addCropToFarm,removeCropFromFarm } from "../hooks/crops";

const FarmDetails = () => {
  const { farm_id } = useParams();
  const navigate = useNavigate();
  const [soilData, setSoilData] = useState(null);
  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const { getFarms, updateFarm, farms } = useFarm();
  const [farmNotifications, setFarmNotifications] = useState([]);
  const [crops, setCrops] = useState([]);
  const [farmCrops, setFarmCrops] = useState([]);
  const [newCrop, setNewCrop] = useState("");
  const { notifications, getNotifications } = useNotify();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const farmSoilData = async (farmId) => {
    try {
      const res = await api.get(`api/farms/${farmId}/data/`);
      const result = Object.assign({}, ...res.data);
      if (result === null) {    
        return;
      }
      setSoilData(result);
    } catch (error) {
      console.error("Error fetching farm data:", error);
    }
  };

  const fetchCrops = async () => { 
    const res = await GetCrops();
    if (res.status === 200) {
      setCrops(res.data);
      console.log("Crops fetched successfully:", crops);
    } else {
      console.error("Error fetching crops:", res.statusText);
    }
    
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleAddCropClick = () => {
    setIsCropModalOpen(true);
  };

  const handleFarmUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateFarm(farm_id, {
        name: farmName,
        location: farmLocation,
        size: farmSize,
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating farm:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddCrop = async (e) => {
    e.preventDefault();
    if (!newCrop.trim()) return;

    try {
      await addCropToFarm(farm_id, { crop_id: parseInt(newCrop) });
      setNewCrop("");
      setIsCropModalOpen(false);
      alert("Crop added successfully!");
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  };

  const handleDeleteCrop = async (farm_id,cropId) => {
    try {
      await removeCropFromFarm(farm_id, cropId);
      alert("Crop deleted successfully!");
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

useEffect(() => {
  const fetchData = async () => {
    if (farms.length === 0) {
      await getFarms();
    }
    await fetchCrops();
    if (notifications.length === 0) {
      await getNotifications();
    }

    if (farms.length > 0) {
      const farm = farms.find((f) => f.farm_id === parseInt(farm_id));
      if (farm) {
        setFarmName(farm.name);
        setFarmLocation(farm.location || "");
        setFarmSize(farm.size || "");
        setFarmCrops(farm.crops || []);
      }
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
}, [notifications, farms, farm_id]);



  return (
    <Sidebar>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="p-4 sm:ml-64">
          {/* Farm Header */}
          <div className="mb-6 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 first-letter:capitalize">
                {farmName} Farm Dashboard
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                {farmLocation && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Location:</span>{" "}
                    {farmLocation}
                  </p>
                )}
                {farmSize && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Size:</span> {farmSize}{" "}
                    Acres
                  </p>
                )}
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600">Crops:</span>
                  {farmCrops.length > 0 ? (
                    <div className="flex flex-wrap gap-1 ml-2">
                      {farmCrops.map((crop) => (
                        <span
                          key={crop.id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {crop.crop}
                          <button
                            onClick={() => handleDeleteCrop(farm_id, crop.id)}
                            className="ml-1 text-green-600 hover:text-red-800 cursor-pointer"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 ml-2">None</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                name="Add Crop"
                action={handleAddCropClick}
                variant="amber"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
              />
              <Button
                name="Edit Farm"
                action={handleEditClick}
                variant="secondary"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
              type="soil_moisture"
              label="Soil Moisture"
              value={soilData?.moisture_level}
              unit="%"
              trend="up"
            />
            <MetricCard
              type="temperature"
              label="Temperature"
              value={soilData?.temperature}
              unit="°C"
              trend="down"
            />
            <MetricCard
              type="nitrogen"
              label="Nitrogen"
              value={soilData?.nitrogen}
              unit="mg/kg"
              trend="neutral"
            />
            <MetricCard
              type="Phosphorus"
              label="Phosphorus"
              value={soilData?.phosphorous}
              unit="mg/kg"
              trend="up"
            />
            <MetricCard
              type="Potassium"
              label="Potassium"
              value={soilData?.potassium}
              unit="mg/kg"
              trend="down"
            />
          </div>
          {/* Crop Recommendations */}
          <CropRecommendation
            soilData={soilData}
            farm_id={farm_id}
          />

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Nutrient Trends
              </h2>
              <div className="h-64">
                <NutrientsChart />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Soil Moisture Trend
              </h2>
              <div className="h-64">
                <MoistureChart />
              </div>
            </div>
          </div>

          {/* Notifications and Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <FarmNotification notifications={farmNotifications} />
            </div>
            <div className="lg:col-span-1">
              <ChatBox
                title="AI AgriSense"
                initialMessage="Hello! I'm your AI Soil Advisor. How can I help you today with your soil management?"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Farm Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Farm Details"
      >
        <form onSubmit={handleFarmUpdate} className="p-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="farmName"
            >
              Farm Name
            </label>
            <input
              id="farmName"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="farmLocation"
            >
              Location
            </label>
            <input
              id="farmLocation"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="farmSize"
            >
              Size (acres)
            </label>
            <input
              id="farmSize"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <Button
              name={isUpdating ? "Updating..." : "Update Farm"}
              type="submit"
              variant="primary"
              disabled={isUpdating}
            />
          </div>
        </form>
      </Modal>

      {/* Add Crop Modal */}
      <Modal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        title="Add New Crop"
      >
        <form onSubmit={handleAddCrop} className="p-6">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="newCrop"
            >
              Crop Name
            </label>
            <select
              id="newCrop"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCrop}
              onChange={(e) => setNewCrop(e.target.value)}
              placeholder="Enter crop name"
              required
            >
              <option value="" disabled>--select-crop--</option>
              {crops.map((c) => (
                <option key={c.id} value={c.crop_id}>
                  {c.crop}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCropModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <Button name="Add Crop" type="submit" variant="primary" />
          </div>
        </form>
      </Modal>
    </Sidebar>
  );
};

export default FarmDetails;
