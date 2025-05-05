import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  email: "",
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
    setStoreUrl: (state, action) => {
      state.hasOnboarded.storeUrl = action.payload; // Set the storeUrl
    },
  },
});

export const { globalUserLogin, globalUserLogout, setStoreUrl } =
  userSlice.actions;
export default userSlice.reducer;
