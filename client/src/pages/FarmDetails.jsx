"use client"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import MetricCard from "../components/MetricCard"
import RecommendationCard from "../components/RecommendationCard"
import ChatBox from "../components/ChatBox"

const FarmDetails = () => {
  const { farmId } = useParams()

  // This would come from an API in a real application
  const farmData = {
    name: "Kayunga Farm",
    metrics: {
      soilMoisture: 45,
      temperature: 23,
      nitrogen: 85,
      phosphorus: 48,
      potassium: 65,
    },
    recommendations: [
      {
        type: "warning",
        title: "Immediate Action Required",
        description: "Soil moisture levels are below optimal. Consider increasing irrigation frequency.",
      },
      {
        type: "info",
        title: "Fertilizer Schedule",
        description: "Apply nitrogen-rich fertilizer within the next 3 days for optimal growth.",
      },
      {
        type: "task",
        title: "Upcoming Tasks",
        description: "Plan for crop rotation in the southern field within 2 weeks.",
      },
    ],
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <Header />

        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{farmData.name} Dashboard</h1>
          <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 6a6 6 0 100-12 6 6 0 000 12zm1-5a1 1 0 11-2 0 1 1 0 012 0zm-3-4a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"></path>
            </svg>
            AI Advisor
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 100 2 1 1 0 000-2z"></path>
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1.464 8.536a1 1 0 10-1.414-1.414l-2 2a1 1 0 101.414 1.414l.293-.293V17a1 1 0 102 0v-4.757l.293.293a1 1 0 001.414-1.414l-2-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            label="Soil Moisture"
            value={farmData.metrics.soilMoisture}
            unit="%"
            color="blue"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            label="Temperature"
            value={farmData.metrics.temperature}
            unit="°C"
            color="red"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            label="Nitrogen"
            value={farmData.metrics.nitrogen}
            unit="mg/kg"
            color="yellow"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            label="Phosphorus"
            value={farmData.metrics.phosphorus}
            unit="mg/kg"
            color="yellow"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            label="Potassium"
            value={farmData.metrics.potassium}
            unit="mg/kg"
            color="yellow"
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
            <h2 className="text-lg font-semibold mb-4">Soil Moisture Trend</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart would be displayed here</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
          {farmData.recommendations.map((rec, index) => (
            <RecommendationCard key={index} type={rec.type} title={rec.title} description={rec.description} />
          ))}
        </div>

        {/* AI Chat */}
        <ChatBox
          title="AI AgriSense"
          initialMessage="Hello! I'm your AI Soil Advisor. How can I help you today with your soil management?"
        />
      </div>
    </div>
  )
}

export default FarmDetails

