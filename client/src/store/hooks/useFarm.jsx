import { useSelector, useDispatch } from "react-redux";
import {
  createFarm,
  deleteFarm,
  fetchFarms,
  fetchFarmerProfile,
  clearFarmError,
  resetCreateStatus,
} from "../slices/farms";

export const useFarm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.farm);

  return {
    farms: state.farms,
    loading: state.loading,
    error: state.error,

    createFarm: (data) => dispatch(createFarm(data)),
    deleteFarm: (id) => dispatch(deleteFarm(id)),
    getFarms: () => dispatch(fetchFarms()),
    getFarmerProfile: () => dispatch(fetchFarmerProfile()),
    getFarmDetails: (id) => dispatch(fetchFarmerProfile(id)),
    clearError: () => dispatch(clearFarmError()),
    resetCreate: () => dispatch(resetCreateStatus()),
  };
};
