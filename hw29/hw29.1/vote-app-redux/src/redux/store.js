import emojiReducer from './slice/emojiSlice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    voting: emojiReducer
  },
});

export default store;
