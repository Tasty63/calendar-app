import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarState, DayEvent } from '../../types/calendar-types';

const initialState: CalendarState = {
  events: [],
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<DayEvent>) => {
      state.events.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    update: (state, action: PayloadAction<DayEvent>) => {
      state.events = state.events.map((event) => {
        return event.id === action.payload.id ? action.payload : event;
      });
    },
  },
});

export const { add, update, remove } = eventSlice.actions;

export default eventSlice.reducer;
