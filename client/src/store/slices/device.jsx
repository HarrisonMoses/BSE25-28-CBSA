import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../hooks/axiosConfigs/intercepters";

export const createDevice = createAsyncThunk(
  "device/remove",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.post(`api/farms/${farm_id}/devices/`, deviceData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const deleteDevice = createAsyncThunk(
  "device/remove",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`api/farms/${farm_id}/devices/${deviceId}/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const changeStatus = createAsyncThunk(
  "device/changeStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`api/device/${id}/`, {
        is_read: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  devices: [],
  createStatus: "idle",
  deleteStatus: "idle",
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    cleardevices: (state) => {
      state.devices = [];
    },
    unreaddevices: (state, action) => {
      const unreadCount = state.devices.reduce((count, device) => {
        return count + (device.is_read ? 0 : 1);
      }, 0);
      state.unread = unreadCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDevice.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.devices = state.devices.filter(
          (device) => device.id !== action.payload
        );
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.devices.findIndex(
          (device) => device.id === action.payload.id
        );
        if (index !== -1) {
          state.devices[index] = action.payload;
        }
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearDevices } =
  devicesSlice.actions;
export default devicesSlice.reducer;
