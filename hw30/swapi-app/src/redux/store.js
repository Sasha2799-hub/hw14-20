import { configureStore } from "@reduxjs/toolkit";
import swapiReducer from "../redux/slice/swapiSlice";

export const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  },
})
