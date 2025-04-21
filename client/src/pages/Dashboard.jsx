"use client";

import { useState, useEffect } from "react";
import FarmCard from "../components/FarmCard";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";
import FarmForm from "../components/FarmForm";
import { useFarm } from "../store/hooks/useFarm";

const Dashboard = () => {
  const { farms, loading, error, getFarms, deleteFarm } = useFarm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getFarms();
    
  }, []);

  const handleAddFarm = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    // Refresh farms list after adding a new farm
    getFarms();
  };

  const handleDeleteClick = (farm) => {
    setSelectedFarm(farm);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFarm) return;

    setIsDeleting(true);
    try {
      await deleteFarm(selectedFarm.farm_id);
      setIsDeleteModalOpen(false);
      setSelectedFarm(null);
      
      getFarms();
    } catch (error) {
      console.error("Error deleting farm:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Determine which farms to display
  const displayFarms = Array.isArray(farms) && farms.length > 0 ? farms : [];

  return (
    <Sidebar>
      <div>
        <div className="mt-4 p-4 sm:ml-64">
          
          <div className="mb-6 flex space-x-3">
            <AddButton text="Add New Farm" onClick={handleAddFarm} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {loading && (
              <div className="flex items-center justify-center">
                <p className="text-gray-500">Loading farms...</p>
              </div>
            )} */}
            {error && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-500">
                Error loading farms: {error.message || JSON.stringify(error)}
              </div>
            )}
            {farms.length > 0 ? (
              farms.map((farm) => (
                <div key={farm.farm_id} className="relative">
                  <button
                    onClick={() => handleDeleteClick(farm)}
                    className="absolute bottom-5 left-4 z-10 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    title="Delete Farm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                  <FarmCard
                        status ='Active'
                    farmName={farm.name}
                    location={farm.location}
                    size={farm.size}
                    crops={farm.crops?.map((crop) => crop.crop).join(", ")}
                    farm_id={farm.farm_id}
                    // status={farm.status || "Active"}
                  />
                </div>
              ))
            ) : !loading && !error ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
                <p className="text-gray-500">
                  No farms available. Add your first farm!
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Click the "Add New Farm" button above to create your first
                  farm.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Add Farm Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add New Farm"
      >
        <FarmForm onClose={closeAddModal} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="p-4">
          <p className="mb-4 text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedFarm?.name} Farm</span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <Button
              name={isDeleting ? "Deleting..." : "Delete Farm"}
              action={handleDeleteConfirm}
              variant="primary"
              disabled={isDeleting}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
      </Modal>
    </Sidebar>
  );
};

export default Dashboard;
