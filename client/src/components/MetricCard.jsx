const MetricCard = ({ icon, label, value, unit, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-800"
      case "green":
        return "bg-green-50 text-green-800"
      case "red":
        return "bg-red-50 text-red-800"
      case "yellow":
        return "bg-yellow-50 text-yellow-800"
      case "purple":
        return "bg-purple-50 text-purple-800"
      default:
        return "bg-gray-50 text-gray-800"
    }
  }

  return (
    <div className={`p-4 rounded-lg ${getColorClasses()}`}>
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xl font-bold">
            {value}
            {unit && <span className="ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MetricCard

