"use client"
import { useParams } from "react-router-dom"
import { useFarm } from "../store/hooks/useFarm"
import { useSelector } from "react-redux";
import {api} from "../hooks/axiosConfigs/intercepters"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import MetricCard from "../components/MetricCard"
import RecommendationCard from "../components/RecommendationCard"
import ChatBox from "../components/ChatBox"
import { useEffect,useState } from "react"

const FarmDetails = () => {
  const { farm_id } = useParams()
  const [farmData, setFarmData] = useState(null)
  const [farmName, setFarmName] = useState(null)
  const farms = useSelector((state) => state.farms);

  const farmSoilData = async (farmId) => { 
    try {
      const res = await api.get(`api/farms/${farmId}/data/`);
      const result = Object.assign({}, ...res.data);
      setFarmData(result); 
      console.log("Farm data:", result);
      
    } catch (error) {
      console.error("Error fetching farm data:", error);
    }

  }

  
  const getFarmName = (id) => {
    try {
      const farm = farms.find((farm) => farm.farm_id === id);
      setFarmName(farm?.name || "Unknown Farm");
    } catch (err) {
      console.error("Error finding farm:", err);
      setFarmName("Unknown Farm");
    }
  };



 useEffect(() => {
   const fetchData = async () => {
     await farmSoilData(farm_id);
   };

   getFarmName(farm_id);
    
   fetchData();
 }, [farm_id,farms]);


  // This would come from an API in a real application

  return (
    <Sidebar>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-4 sm:ml-64">
          <Header />

          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 first-letter:capitalize">{farmName} Farm Dashboard</h1>
            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 6a6 6 0 100-12 6 6 0 000 12zm1-5a1 1 0 11-2 0 1 1 0 012 0zm-3-4a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"></path>
              </svg>
              AI Advisor
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
              type="soil_moisture"
              label="Soil Moisture"
              value={farmData?.moisture_level}
              unit="%"
            />
            <MetricCard
              type="temperature"
              label="Temperature"
              value={farmData?.temperature}
              unit="°C"
            />
            <MetricCard
              type="nitrogen"
              label="Nitrogen"
              value={farmData?.nitrogen}
              unit="mg/kg"
            />
            <MetricCard
              type="Phosphorus"
              label="Phosphorus"
              value={farmData?.phosphorous}
              unit="mg/kg"
            />
            <MetricCard
              type="Potassium"
              label="Potassium"
              value={farmData?.potassium}
              unit="mg/kg"
            />
            
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Nutrient Trends</h2>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Chart would be displayed here</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Soil Moisture Trend
              </h2>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Chart would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
            {farmData?.recommendations?.map((rec, index) => (
              <RecommendationCard
                key={index}
                type={rec.type}
                title={rec.title}
                description={rec.description}
              />
            ))}
          </div>

          {/* AI Chat */}
          <ChatBox
            title="AI AgriSense"
            initialMessage="Hello! I'm your AI Soil Advisor. How can I help you today with your soil management?"
          />
        </div>
      </div>
    </Sidebar>
  );
}

export default FarmDetails

