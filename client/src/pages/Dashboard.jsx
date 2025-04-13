"use client";

import { useState, useEffect } from "react";
import FarmCard from "../components/FarmCard";
import AddButton from "../components/AddButton";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";
import FarmForm from "../components/FarmForm";
import { useFarm } from "../store/hooks/useFarm";

const Dashboard = () => {
  const { farms, loading, error, getFarms } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getFarms();
  }, []);

  const handleAddFarm = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Sidebar>
      <div>
        <div className="p-4 sm:ml-64">
          <Header />

          <div className="mb-6">
            <AddButton text="Add New Farm" onClick={handleAddFarm} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center h-full">
                <p className="text-gray-500">Loading farms...</p>
              </div>
            )}
            {error && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-500">
                Error loading farms: {error.message || "Unknown error"}
              </div>
            )}
            {Array.isArray(farms) && farms.length > 0 ? (
              farms.map((farm) => (
                <FarmCard
                  key={farm.farm_id}
                  farmName={farm.name}
                  location={farm.location}
                  size={farm.size}
                  crops={farm.crops?.map((crop) => crop.name).join(", ")}
                  farm_id={farm.farm_id}
                  status={farm.status || "Active"}
                />
              ))
            ) : !loading && !error ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
                <p className="text-gray-500">
                  No farms available. Add your first farm!
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Add Farm Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Farm">
        <FarmForm onClose={closeModal} />
      </Modal>
    </Sidebar>
  );
};

export default Dashboard;
