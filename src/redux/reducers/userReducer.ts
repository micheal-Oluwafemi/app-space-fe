import store from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface UserState {
  user: User | null;
  email: string;
  storeCode: string;
  storeID: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  email: "",
  storeCode: "",
  storeID: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    globalUserLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    globalUserLogout: (state) => {
      state.user = null;
      state.email = "";
      state.isLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("email");
      }
    },
    storeCode: (state, action: PayloadAction<string>) => {
      state.storeCode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("storeCode", action.payload);
      }
    },
    storeID: (state, action: PayloadAction<string>) => {
      state.storeID = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("storeID", action.payload);
      }
    },
  },
});

export const { globalUserLogin, globalUserLogout, storeCode, storeID } =
  userSlice.actions;
export default userSlice.reducer;
