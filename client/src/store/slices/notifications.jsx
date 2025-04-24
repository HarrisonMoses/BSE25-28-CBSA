import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../hooks/axiosConfigs/intercepters";

export const fetchNotifications = createAsyncThunk(
    "notification/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("api/notification/");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
export const deleteNotification = createAsyncThunk(
    "notification/remove",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`api/notification/${id}/`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
     }
);
export const markAsRead = createAsyncThunk(
    "notification/markAsRead",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`api/notification/${id}/`, { is_read: true });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);



const initialState = {
    notifications: [],
    unread: 0,
    loading: false,
    error: null,
    createStatus: "idle",
    deleteStatus: "idle",
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
    unreadNotifications: (state, action) => { 
      const unreadCount = state.notifications.reduce((count, notification) => {
        return count + (notification.is_read ? 0 : 1);
      }, 0);
      state.unread = unreadCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })
      .addCase(markAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearNotifications,unreadNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;