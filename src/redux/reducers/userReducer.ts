import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface UserState {
  user: User | null;
  email: string;
  setSelectedStore: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  email:
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "",
  setSelectedStore: "",

  isLoggedIn:
    typeof window !== "undefined" ? !!localStorage.getItem("user") : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    globalUserLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("email", action.payload.email);
      }
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
    setSelectedStore: (state, action: PayloadAction<string>) => {
      state.setSelectedStore = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedStore", action.payload);
      }
    },
  },
});

export const { globalUserLogin, globalUserLogout, setSelectedStore } =
  userSlice.actions;
export default userSlice.reducer;
