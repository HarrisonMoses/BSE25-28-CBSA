"use client";

const Button = ({ name, action, icon, variant = "primary" }) => {
  const getButtonClasses = () => {
    switch (variant) {
      case "primary":
        return "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300";
      case "secondary":
        return "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300";
      case "success":
        return "text-white bg-green-600 hover:bg-green-700 focus:ring-green-300";
      default:
        return "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300";
    }
  };

  return (
    <button
      onClick={action}
      type="button"
      className={`flex items-center font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none focus:ring-4 ${getButtonClasses()}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );
};

export default Button;
