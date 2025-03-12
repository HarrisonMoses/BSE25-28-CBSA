const RecommendationCard = ({ type, title, description }) => {
  const getTypeIcon = () => {
    switch (type) {
      case "warning":
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
            <svg
              className="w-5 h-5 text-red-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )
      case "info":
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
            <svg
              className="w-5 h-5 text-blue-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )
      case "task":
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
            <svg
              className="w-5 h-5 text-yellow-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const getTypeClass = () => {
    switch (type) {
      case "warning":
        return "border-red-200 bg-red-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      case "task":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className={`p-4 mb-4 border rounded-lg ${getTypeClass()}`}>
      <div className="flex">
        {getTypeIcon()}
        <div className="ml-3">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard

