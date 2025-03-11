import React from "react";

const FarmCard = ({ farmname, location, size, crops, status, func }) => {
  // Determine status color based on the status value
  const statusClass =
    status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-yellow-100 text-red-800 dark:bg-red-900 dark:text-red-300";

  return (
    <div className="max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-row gap-12 justify-between items-center">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {farmname} Farm
          </h5>
        </a>
        <p
          className={`h-max text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ${statusClass}`}
        >
          {status}
        </p>
      </div>
      <p className="mb-3 font-normal text-gray-30">Location: {location}</p>
      <div className="flex gap-20">
        <div>
          <p>
            Size: <span>{size}</span>
          </p>
        </div>
        <div>
          <p>
            Crops: <span>{crops}</span>
          </p>
        </div>
      </div>

      <div className="m-2 flex justify-end" onClick={func}>
        <p className="inline-flex items-center text-sm font-medium text-black hover:underline">
          View details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default FarmCard;
