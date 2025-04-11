const MetricCard = ({ type, label, value, unit }) => {
  // Define color and icon mappings
  const metricConfig = {
    soil_moisture: {
      color: "blue",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 7a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 100 2 1 1 0 000-2z"></path>
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1.464 8.536a1 1 0 10-1.414-1.414l-2 2a1 1 0 101.414 1.414l.293-.293V17a1 1 0 102 0v-4.757l.293.293a1 1 0 001.414-1.414l-2-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    temperature: {
      color: "red",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    nitrogen: {
      color: "yellow",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    Phosphorus: {
      color: "yellow",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    Potassium: {
      color: "yellow",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
  };

  // Get the configuration for the current metric type
  const config = metricConfig[type] || {
    color: "gray",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14a6 6 0 1112 0 6 6 0 01-12 0zm1-6a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-800";
      case "green":
        return "bg-green-50 text-green-800";
      case "red":
        return "bg-red-50 text-red-800";
      case "yellow":
        return "bg-yellow-50 text-yellow-800";
      case "purple":
        return "bg-purple-50 text-purple-800";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  return (
    <div className={`p-4 rounded-lg ${getColorClasses(config.color)}`}>
      <div className="flex items-center">
        <div className="mr-3">{config.icon}</div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xl font-bold">
            {value || "Loading..."}
            {unit && <span className="ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
