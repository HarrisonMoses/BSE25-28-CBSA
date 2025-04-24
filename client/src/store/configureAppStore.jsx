import { configureStore } from "@reduxjs/toolkit";
import farmReducer from "./slices/farms";
import authReducer from "./slices/auth";
import notifyReducer from "./slices/notifications";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    farm: farmReducer,
    notify: notifyReducer,
  },
});

export default store;
