import { configureStore } from "@reduxjs/toolkit";
import farmReducer from "./slices/farms";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    farm: farmReducer,
  },
});

export default store;
