import { useState, useEffect } from "react";
import Button from "./Button";
import { api } from "../hooks/axiosConfigs/intercepters";

const CropRecommendation = ({ soilData, farm_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [hoveredCrop, setHoveredCrop] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Load recommendations on component mount
  useEffect(() => {
    const saved = localStorage.getItem(`cropRecommendations-${farm_id}`);
    if (saved) {
      setRecommendations(JSON.parse(saved));
    }
  }, [farm_id]);

  const getRecommendations = async () => {
    if (!soilData || !farm_id) {
      console.warn("Missing soil data or farm ID");
      return;
    }

    // Prevent duplicate requests
    if (isLoading || hasFetched) return;

    setIsLoading(true);

    try {
      const res = await api.get(`api/recommendation/${farm_id}/`);
      const data = res.data?.recommendations;

      if (data && Array.isArray(data)) {
        setRecommendations(data);
        localStorage.setItem(
          `cropRecommendations-${farm_id}`,
          JSON.stringify(data)
        );
        setHasFetched(true);
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear recommendations if soil data is missing
  useEffect(() => {
    if (!soilData && recommendations) {
      setRecommendations(null);
      localStorage.removeItem(`cropRecommendations-${farm_id}`);
    }
  }, [soilData, farm_id, recommendations]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500 mb-2">
            Based on current soil conditions
          </p>
          <Button
            name={isLoading ? "Analyzing..." : "Get Recommendations"}
            action={getRecommendations}
            variant="success"
            disabled={isLoading || !soilData || hasFetched}
          />
        </div>

        {recommendations && (
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {recommendations.map((crop, index) => (
              <div
                key={`${farm_id}-${index}`}
                className="relative"
                onMouseEnter={() => setHoveredCrop(index)}
                onMouseLeave={() => setHoveredCrop(null)}
              >
                <div className="px-4 py-2 bg-green-100 text-gray-700 rounded-full font-medium cursor-pointer hover:bg-green-200 transition-colors">
                  {crop.name}
                </div>

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

      {!soilData && (
        <p className="text-sm text-red-500 text-center mt-2">
          Soil data unavailable for recommendations
        </p>
      )}
    </div>
  );
};

export default CropRecommendation;
