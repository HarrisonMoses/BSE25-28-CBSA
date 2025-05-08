import { useState } from "react";
import Button from "./Button";
import { api } from "../hooks/axiosConfigs/intercepters";

const CropRecommendation = ({ soilData, farm_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem(`cropRecommendations ${farm_id}`);
    return saved ? JSON.parse(saved) : null;
  });
  const [hoveredCrop, setHoveredCrop] = useState(null);

  const getRecommendations = async () => {
    if (!soilData) return;

    setIsLoading(true);
      const id = parseInt(farm_id);
      console.log(typeof id);
      try {
        const res = await api.get(`api/recommendation/${id}/`);
          const data = res.data.recommendations;
          
          setRecommendations(data)            
          localStorage.setItem(
            `cropRecommendations ${farm_id}`,
            JSON.stringify(data)
          );
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
      <div className="flex gap-40 items-center mb-6">
        <div>
          <p className="text-sm text-gray-500 text-center mb-2">
            Based on current soil conditions
          </p>
          <Button
            name={isLoading ? "Analyzing..." : "Get Recommendations"}
            action={getRecommendations}
            variant="success"
            disabled={isLoading || !soilData}
          />
        </div>
        <div>
          {recommendations && (
            <div className="flex flex-wrap items-center gap-3">
              {recommendations.map((crop, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredCrop(index)}
                  onMouseLeave={() => setHoveredCrop(null)}
                >
                  <div className="px-4 py-2 bg-green-100 text-gray-700 rounded-full font-medium cursor-pointer">
                    {crop.name}
                  </div>

                  {/* Hover tooltip */}
                  {hoveredCrop === index && (
                    <div className="absolute z-10 w-64 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="text-sm text-gray-700">
                        <p className="font-medium text-gray-900 mb-1">
                          {crop.name}
                        </p>
                        <p>{crop.rsn}</p>
                      </div>
                      <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
