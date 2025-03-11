import React from "react";

const Button = ({ name, action }) => {
  return (
    <div className="mt-2">
      <button
        onClick={action}
        type="button"
        className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
      >
        <span className="mr-2 text-xl">+</span>
        {name}
      </button>
    </div>
  );
};

export default Button;
