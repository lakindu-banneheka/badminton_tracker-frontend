import { configureStore } from '@reduxjs/toolkit';
import matchReducer from '../features/matchSlice';

// Load state from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('matchData');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('matchData', serializedState);
  } catch {
    // ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    match: matchReducer,
  },
  // preloadedState // Initialize the store with preloaded state
});

// Save state to localStorage whenever the Redux state changes
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
