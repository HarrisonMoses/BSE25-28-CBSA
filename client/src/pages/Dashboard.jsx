"use client";
import FarmCard from "../components/FarmCard";
import AddButton from "../components/AddButton";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  const farms = [
    {
      name: "Kayunga",
      location: "Kayunga District, Uganda",
      size: "50",
      crops: "Coffee, Maize",
      status: "Active",
    },
    {
      name: "Masaka",
      location: "Masaka District, Uganda",
      size: "35",
      crops: "Banana, Cassava",
      status: "Active",
    },
    {
      name: "Mubende",
      location: "Mubende District, Uganda",
      size: "40",
      crops: "Coffee, Vanilla",
      status: "Maintenance",
    },
  ];

  const handleAddFarm = () => {
    console.log("Add new farm clicked");
    // In a real app, you would navigate to a form or open a modal
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <Header />

        <div className="mb-6">
          <AddButton text="Add New Farm" onClick={handleAddFarm} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm, index) => (
            <FarmCard
              key={index}
              farmName={farm.name}
              location={farm.location}
              size={farm.size}
              crops={farm.crops}
              status={farm.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
