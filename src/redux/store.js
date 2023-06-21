import { configureStore } from "@reduxjs/toolkit";
import logInSlice from "./logInSlice";

export const store = configureStore({
  reducer: {
    login: logInSlice,
  },
});
