import { configureStore } from "@reduxjs/toolkit";
import { adminBuildingApiSlice } from "./api/adminBuildingApiSlice";

export const store = configureStore({
  reducer: {
    [adminBuildingApiSlice.reducerPath]: adminBuildingApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminBuildingApiSlice.middleware),
});
