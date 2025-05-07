import {api} from "./axiosConfigs/intercepters";

export const addCropToFarm = async (farm_id, cropId) => {
  try {
    const res = await api.post(`api/farms/${farm_id}/crops/`, cropId);
    return res.data;
  }catch (error) {
    console.error("Error adding crop to farm:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
  
};
export const removeCropFromFarm = async (farm_id, cropId) => {
  try {
    const res = await api.delete(`api/farms/${farm_id}/crops/${cropId}/`);
    return res.data;
  }
  catch (error) {
    console.error("Error deleting crop from farm:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
  
};

export const GetCrops = async () =>{
  try {
    const res = await api.get(`api/crop/`);
    return res;
  } catch (error) {
    console.error("Error fetching crops:", error);
    throw error; 
  }
  
 }