"use client";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeviceTable from "../components/DeviceTable";
import AddButton from "../components/AddButton";
import { useFarm } from "../store/hooks/useFarm";
import { useEffect } from "react";

const DeviceManagement = () => {

  const { farms ,getFarms} = useFarm();

  useEffect(() => {
    const getFarm = () => {
      if (!farms) {
        getFarms();
        console.log(farms)
      }
    }

    getFarm();
      
  },[farms])
  

  const handleAddDevice = () => {
    console.log("Add new device clicked");
    // In a real app, you would navigate to a form or open a modal
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
  </Sidebar>
  );
};

export default DeviceManagement;
