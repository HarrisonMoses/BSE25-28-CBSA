import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const FarmLink = ({ farm }) => {
  const location = useLocation();
  const isActive = useMemo(
    () => location.pathname === `/farms/${farm.farm_id}`,
    [location.pathname, farm.farm_id]
  );

  return (
    <Link
      to={`/farms/${farm.farm_id}`}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      <span className="ml-6 first-letter:capitalize">{farm.name} Farm</span>
    </Link>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(FarmLink);
