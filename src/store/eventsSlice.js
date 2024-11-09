import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    {
      title: "Interview",
      start: "2024-10-10T16:30:00",
      end: "2024-10-10T17:30:00",
      extendedProps: { id: crypto.randomUUID() },
    },
    {
      title: "Meeting with Alex",
      start: "2024-10-13T12:30:00",
      end: "2024-10-14T13:30:00",
      description: "Meeting with Alex",
      extendedProps: { id: crypto.randomUUID() },
    },
    {
      title: "JS Course",
      start: "2024-10-08T12:30:00",
      end: "2024-10-09T13:30:00",
      description: "Learn Inheritance",
      extendedProps: { id: crypto.randomUUID() },
    },
  ],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.extendedProps?.id === action.payload.extendedProps?.id
      );
      if (index > -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload,
        };
      }
    },
    deleteEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.extendedProps?.id === action.payload
      );
      if (index > -1) {
        state.events.splice(index, 1);
      }
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
