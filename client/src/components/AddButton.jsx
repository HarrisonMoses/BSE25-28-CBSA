"use client"

const AddButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center text-white bg-amber-900 hover:bg-amber-950 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5"
    >
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      {text}
    </button>
  )
}

export default AddButton

