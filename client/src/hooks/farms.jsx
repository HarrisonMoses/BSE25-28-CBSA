import {api} from "./axiosConfigs/intercepters";


export const Create_farm = async (credentials) => {
  const res = await api.post("api/farms/", credentials);
  return res.data;
};
export const Delete_farm = async (id) => {
  const res = await api.delete(`api/farms/${id}/`);
  return res.data;
};
export const Get_farm_details = async () => {
  const res = await api.get("api/farms/");
  return res.data;
};
export const Get_farmer_profile = async () => {
  const res = await api.get("api/farmer/");
  return res.data;
};