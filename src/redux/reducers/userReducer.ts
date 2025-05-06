import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  email: "",
  setSelectedStore: "",
  hasOnboarded: {
    storeUrl: "",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    globalUserLogin: (state, action) => {
      state.user = action.payload;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    globalUserLogout: (state) => {
      state.user = null;
      state.email = "";
      state.isLoggedIn = false;
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
