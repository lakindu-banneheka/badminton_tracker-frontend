import { configureStore } from '@reduxjs/toolkit';
import matchReducer from '../features/matchSlice';

export const store = configureStore({
  reducer: {
    match: matchReducer,
  },
})