"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/logo"

const RegisterDevice = () => {
  const [formData, setFormData] = useState({
    deviceName: "",
    uniqueId: "",
    selectedFarm: "",
  })

  const farms = [
    { id: 1, name: "Kayunga Farm" },
    { id: 2, name: "Masaka Farm" },
    { id: 3, name: "Mubende Farm" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Device registration data:", formData)
    // In a real app, you would handle device registration here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Logo className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Register Your Device</h2>
        <p className="text-center text-gray-600 mb-6">Register your farm device to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="deviceName" className="block mb-2 text-sm font-medium text-gray-700">
              Device Name
            </label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Enter device name"
              value={formData.deviceName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="uniqueId" className="block mb-2 text-sm font-medium text-gray-700">
              Unique ID
            </label>
            <input
              type="text"
              id="uniqueId"
              name="uniqueId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Enter device unique ID"
              value={formData.uniqueId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="selectedFarm" className="block mb-2 text-sm font-medium text-gray-700">
              Select Farm
            </label>
            <select
              id="selectedFarm"
              name="selectedFarm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              value={formData.selectedFarm}
              onChange={handleChange}
              required
            >
              <option value="">Choose a farm</option>
              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register Device
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          <Link to="/devices" className="text-indigo-600 hover:underline">
            Back to Device Management
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterDevice

