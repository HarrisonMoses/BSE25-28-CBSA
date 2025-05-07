import {api} from "./axiosConfigs/intercepters";


export const registerDeviceToFarm = async (farm_id, deviceData) => {
  const res = await api.post(`api/farms/${farm_id}/devices/`, deviceData);
  return res.data;
};
export const removeDeviceFarm = async (farm_id, deviceId) => {
  const res = await api.delete(`api/farms/${farm_id}/devices/${deviceId}/`);
  return res.data;
};
