import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";

// Configure the store with reducers
const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
