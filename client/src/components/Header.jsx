const Header = () => {
  return (
    <div className="flex justify-end items-center p-4 mb-4">
      <div className="flex items-center space-x-4">
        <button type="button" className="relative">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
        <img
          className="w-8 h-8 rounded-full border-2 border-gray-200"
          src="/placeholder.svg?height=32&width=32"
          alt="User profile"
        />
      </div>
    </div>
  )
}

export default Header

