"use client";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeviceTable from "../components/DeviceTable";
import AddButton from "../components/AddButton";

const DeviceManagement = () => {
  const kayungaDevices = [
    {
      name: "Soil Moisture Sensor",
      id: "SMS001",
      status: "Online",
      battery: 85,
    },
    {
      name: "Irrigation Controller",
      id: "IC004",
      status: "Maintenance",
      battery: 45,
    },
  ];

  const masakaDevices = [
    {
      name: "Weather Station",
      id: "WS002",
      status: "Online",
      battery: 92,
    },
  ];

  const mubendeDevices = [
    {
      name: "pH Sensor",
      id: "PHS003",
      status: "Offline",
      battery: 12,
    },
  ];

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

        <DeviceTable title="Kayunga Farm Devices" devices={kayungaDevices} />
        <DeviceTable title="Masaka Farm Devices" devices={masakaDevices} />
        <DeviceTable title="Mubende Farm Devices" devices={mubendeDevices} />
      </div>
      </div>
      </Sidebar>
  );
};

export default DeviceManagement;
