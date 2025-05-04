import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: "",
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
