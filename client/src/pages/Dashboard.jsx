import FarmCard from "../components/FarmCard";
import AddButton from "../components/AddButton";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect } from "react";
import {useFarm} from "../store/hooks/useFarm";

const Dashboard = () => {
  const { farms, loading, error, getFarms,load } = useFarm();

  useEffect(() => {
    getFarms();
    
  }, []);

  if (loading) return <div>Loading farms...</div>;
  if (error) return <div>Error: {error.message}</div>;


  
  const handleAddFarm = () => {
    console.log("Add new farm clicked");
    // In a real app, you would navigate to a form or open a modal
  };

  return (
  <Sidebar>
    <div >

      <div className="p-4 sm:ml-64">
        <Header />

        <div className="mb-6">
          <AddButton text="Add New Farm" onClick={handleAddFarm} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
          <div className="flex items-center justify-center">
              <p className="text-gray-500">Loading farms...</p>
            </div>
          )}
          {
            farms?.map((farm) => (
            <FarmCard
                key={farm.farm_id}
                status ='Active'
              farmName={farm.name}
              location={farm.location}
              size={farm.size}
              crops={farm.crops?.map(crop => crop.name).join(", ")}
              farm_id = {farm.farm_id}
            />
          ))}
        </div>
      </div>
    </div>
  </Sidebar>
  );
};

export default Dashboard;
