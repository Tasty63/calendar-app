import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DayEventProps } from '../../types/calendar-types';

const initialState: DayEventProps[] = [
  {
    id: 1,
    day: 'Thu Apr 21 2022',
    name: 'Сходить в магазин',
    description: 'Купить: яйца, молоко, хлеб',
    participants: ['Пётр'],
    time: '17:00 - 17:30',
  },
  {
    id: 2,
    day: 'Thu Apr 21 2022',
    name: 'Вынести мусор',
    description: '',
    participants: ['Пётр'],
    time: '17:30 - 17:35',
  },
];

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<DayEventProps>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state = state.filter((event) => event.id !== action.payload);
    },
    update: (state, action: PayloadAction<DayEventProps>) => {
      state = state.map((event) => {
        return event.id === action.payload.id ? action.payload : event;
      });
    },
  },
});

export const { add, update, remove } = eventSlice.actions;

export default eventSlice.reducer;
