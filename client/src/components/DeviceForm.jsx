"use client";

import { useState } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { register_device_to_farm } from "../hooks/devices";

const DeviceForm = ({ onClose }) => {
  const farms = useSelector((state) => state.farm.farms);
  const [formData, setFormData] = useState({
    name: "",
    device_id: "",
    farm_id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register_device_to_farm(formData.farm_id, {
        name: formData.name,
        device_id: formData.device_id,
      });
      onClose();
    } catch (error) {
      console.error("Error registering device:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Device Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="Enter device name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="device_id"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Device ID
        </label>
        <input
          type="text"
          id="device_id"
          name="device_id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="Enter device ID"
          value={formData.device_id}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="farm_id"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Farm
        </label>
        <select
          id="farm_id"
          name="farm_id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          value={formData.farm_id}
          onChange={handleChange}
          required
        >
          <option value="">Choose a farm</option>
          {Array.isArray(farms) && farms.length > 0 ? (
            farms.map((farm) => (
              <option key={farm.farm_id} value={farm.farm_id}>
                {farm.name} Farm
              </option>
            ))
          ) : (
            <option value="" disabled>
              No farms available
            </option>
          )}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <Button
          name={loading ? "Registering..." : "Register Device"}
          action={() => {}}
          variant="success"
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default DeviceForm;
