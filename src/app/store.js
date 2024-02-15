import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counterSlice';
import matchReducer from '../features/matchSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    match: matchReducer,
  },
})