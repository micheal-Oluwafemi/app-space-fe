import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import storeReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
  },
});
