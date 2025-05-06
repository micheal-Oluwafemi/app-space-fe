import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  email: "",
  setSelectedStore: "",
  hasOnboarded: {
    storeUrl: "",
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    globalUserLogin: (state, action) => {
      state.user = action.payload;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    globalUserLogout: (state) => {
      state.user = null;
      state.email = "";
      state.isAuthenticated = false;
    },
    setSelectedStore: (state, action) => {
      state.setSelectedStore = action.payload;
      localStorage.setItem("selectedStore", action.payload);
    },
  },
});

export const { globalUserLogin, globalUserLogout, setSelectedStore } =
  userSlice.actions;
export default userSlice.reducer;
