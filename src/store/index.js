import { configureStore } from '@reduxjs/toolkit';
import toursReducer from './toursSlice';

export const store = configureStore({
  reducer: {
    tours: toursReducer,
  },
}); 