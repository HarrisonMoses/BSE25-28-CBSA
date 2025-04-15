"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeviceTable from "../components/DeviceTable";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import DeviceForm from "../components/DeviceForm";
import { useFarm } from "../store/hooks/useFarm";

const DeviceManagement = () => {
  const { farms,getFarms } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!farms) {
      getFarms(); // Fetch farms if not already available
    }
   
  }, []);

  
  

  const handleAddDevice = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
  
  <Sidebar >
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 sm:ml-64">
        <Header />
        <div className="mb-6">
          <AddButton text="Add New Device" onClick={handleAddDevice} />
        </div>
          {
            farms.map((farm, index) => {
              return ( 
                <DeviceTable
                  key={farm.farm_id}
                  farmName={farm.name}
                  devices={farm.devices}
                />      
              )
            })
        }  
      </div>
    </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Device">
        <DeviceForm onClose={closeModal} />
      </Modal>
  </Sidebar>
  );
};

export default DeviceManagement;
