import { createSlice } from "@reduxjs/toolkit";

const logInSlice = createSlice({
  name: "LoginManager",
  initialState: {
    login: [],
    createuser: [],
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, login: action.payload };
    },
    createuser: (state, action) => {
      return { ...state, createuser: action.payload };
    },
  },
});

export const { login, createuser } = logInSlice.actions;

export default logInSlice.reducer;
