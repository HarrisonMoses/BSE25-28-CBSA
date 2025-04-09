import {api} from "./axiosConfigs/intercepters";

export const Add_crop_to_farm = async (farm_id, cropData) => {
  const res = await api.post(`api/farms/${farm_id}/farmcrop/`, cropData);
  return res.data;
};
export const Delete_crop_from_farm = async (farm_id, cropId) => {
  const res = await api.delete(`api/farm/${farm_id}/farmcrop/${cropId}/`);
  return res.data;
};
