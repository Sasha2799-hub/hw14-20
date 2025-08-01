import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slice/todoSlice'

export const store = configureStore({
  reducer: {
    todo: todoSlice
  },
});

export default store;