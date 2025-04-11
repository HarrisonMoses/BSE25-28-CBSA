import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Create_farm, Get_farm_details, Delete_farm } from "../hooks/UserfetchQuery";

// Create farm async thunk
export const createFarm = createAsyncThunk(
  'farm/createFarm',
  async (farmData, thunkAPI) => {
    try {
      const response = await create_farm(farmData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getFarms = createAsyncThunk(
  "farm/Get_farm_details",
  async (_, thunkAPI) => {
    try {
      const response = await fetchFarms();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteFarm = createAsyncThunk(
  "farm/deleteFarm",
  async (farmId, thunkAPI) => {
    try {
      await deleteFarm(farmId);
      return farmId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const farm = createSlice({
  name: "farm",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setFarmData: (state, action) => {
      state.data = action.payload;
    },
    setFarmStatus: (state, action) => {
      state.status = action.payload;
    },
    setFarmError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
        builder
          // Handle createFarm async thunk
          .addCase(createFarm.pending, (state) => {
            state.status = "loading";
          })
          .addCase(createFarm.fulfilled, (state, action) => {
            state.status = "success";
            state.data.push(action.payload);
          })
          .addCase(createFarm.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to create farm";
          })
          // Handle getFarms async thunk
          .addCase(getFarms.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getFarms.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload; // Assuming the payload is the array of farms
          })
          .addCase(getFarms.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to fetch farms";
          })
          // Handle deleteFarm async thunk
          .addCase(deleteFarm.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deleteFarm.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = state.data.filter(
              (farm) => farm.farm_id !== action.payload
            );
          })
          .addCase(deleteFarm.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to delete farm";
          });
  },
});

export const { setFarmData, setFarmStatus, setFarmError } = farm.actions;
export default farm.reducer;