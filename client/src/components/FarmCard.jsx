import { Link } from "react-router-dom";

const FarmCard = ({id, farmName, location, size, crops, status }) => {
  // Determine status color based on the status value
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{farmName} Farm</h3>
        <span
          className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusClass(
            status
          )}`}
        >
          {status}
        </span>
      </div>
      <p className="text-gray-600 mb-3">Location: {location}</p>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-gray-600">
            Size: <span className="font-medium">{size} acres</span>
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            Crops: <span className="font-medium">{crops}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to={`/farms/${id}`}  
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View Details
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FarmCard;
