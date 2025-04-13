// features/farm/farmSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../hooks/axiosConfigs/intercepters";

// Async thunks
export const createFarm = createAsyncThunk(
  "farm/create",
  async (farmData, { rejectWithValue }) => {
    try {
      const response = await api.post("api/farms/", farmData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteFarm = createAsyncThunk(
  "farm/delete",
  async (farmId, { rejectWithValue }) => {
    try {
      await api.delete(`api/farms/${farmId}/`);
      return farmId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFarms = createAsyncThunk(
  "farm/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/farms/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFarmerProfile = createAsyncThunk(
  "farm/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/farmer/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  farms: [],
  farmerProfile: null,
  loading: false,
  error: null,
};

const farmSlice = createSlice({
  name: "farm",
  initialState,

  reducers: {
    clearFarmError: (state) => {
      state.error = null;
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
    },

    getFarmsDetails: (state, action) => {
      state.farms = state.farms.find((farm) => {
        farm.farm_id === action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Farm
      .addCase(createFarm.pending, (state) => {
        state.createStatus = "loading";
        state.loading = true;
      })
      .addCase(createFarm.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.loading = false;
        state.farms.push(action.payload);
      })
      .addCase(createFarm.rejected, (state, action) => {
        state.createStatus = "failed";
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Farm
      .addCase(deleteFarm.pending, (state) => {
        state.deleteStatus = "loading";
        state.loading = true;
      })
      .addCase(deleteFarm.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.loading = false;
        state.farms = state.farms.filter((farm) => farm.id !== action.payload);
      })
      .addCase(deleteFarm.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Farms
      .addCase(fetchFarms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarms.fulfilled, (state, action) => {
        state.loading = false;
        state.farms = action.payload;
      })
      .addCase(fetchFarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Farmer Profile
      .addCase(fetchFarmerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarmerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.farmerProfile = action.payload;
      })
      .addCase(fetchFarmerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFarmError, resetCreateStatus } = farmSlice.actions;
export default farmSlice.reducer;
