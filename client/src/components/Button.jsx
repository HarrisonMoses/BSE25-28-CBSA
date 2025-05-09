"use client";

const Button = ({
  name,
  action,
  icon,
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const getButtonClasses = () => {
    switch (variant) {
      case "primary":
        return "text-white bg-red-600 hover:bg-red-700 focus:ring-indigo-300";
      case "secondary":
        return "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300";
      case "success":
        return "text-white bg-green-700 hover:bg-green-600 focus:ring-green-300";
      case 'amber':
        return "text-white bg-amber-900 hover:bg-amber-950 focus:ring-indigo-300";

      default:
        return "text-white bg-amber-900 hover:bg-amber-950 focus:ring-indigo-300";
    }
  };

  return (
    <button
      onClick={action}
      type={type}
      disabled={disabled}
      className={`flex items-center font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none focus:ring-4 cursor-pointer ${getButtonClasses()} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );
};

export default Button;
