"use client";

import { useState } from "react";
import Button from "./Button";
import { useFarm } from "../store/hooks/useFarm";

const FarmForm = ({ onClose }) => {
  const { createFarm } = useFarm();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    size: "",
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
      await createFarm(formData);
      onClose();
    } catch (error) {
      console.error("Error creating farm:", error);
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
          Farm Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="Enter farm name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="Enter farm location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="size"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Size (acres)
        </label>
        <input
          type="number"
          id="size"
          name="size"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="Enter farm size in acres"
          value={formData.size}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
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
          name={loading ? "Saving..." : "Save Farm"}
          action={() => {}}
          variant="success"
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default FarmForm;
