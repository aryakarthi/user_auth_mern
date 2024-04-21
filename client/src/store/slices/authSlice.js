import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userdata")) || null;

const initialState = {
  userData,
  isLoggedIn: !!userData,
  // isLoggedIn: true if userData is not null. false if userData is null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("userdata", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.clear("userdata");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
