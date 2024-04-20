import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userData")) || null;

const initialState = {
  userData,
  isLoggedIn: !!userData,
  // isLoggedIn: true if userData is not null. false if userData is null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
