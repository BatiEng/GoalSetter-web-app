import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice.js";
import { goalSlice } from "./features/goals/goalSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    goals: goalSlice.reducer,
  },
});
