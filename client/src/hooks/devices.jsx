import {api} from "./axiosConfigs/intercepters";


export const Add_device_to_farm = async (farm_id, deviceData) => {
  const res = await api.post(`api/farms/${farm_id}/device/`, deviceData);
  return res.data;
};
export const Delete_device_from_farm = async (farm_id, deviceId) => {
  const res = await api.delete(`api/farms/${farm_id}/device/${deviceId}/`);
  return res.data;
};
