import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DayEventProps } from '../../types/calendar-types';

const initialState: DayEventProps[] = [
  {
    id: 1,
    day: 'Thu Apr 21 2022',
    title: 'Сходить в магазин',
    description: 'Купить: яйца, молоко, хлеб',
    participants: ['Пётр'],
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    id: 2,
    day: 'Thu Apr 21 2022',
    title: 'Вынести мусор',
    description: 'lorem',
    participants: ['Пётр', 'Алексей', 'Александр'],
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    id: 3,
    day: 'Thu Apr 21 2022',
    title: 'Вынести мусор',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores optio sed natus voluptas. Eaque voluptatum
    fugiat explicabo. Dolores sed, maiores rem id, ut molestiae nesciunt, corporis maxime tempore ea recusandae.`,
    participants: ['Пётр'],
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    id: 6,
    day: 'Thu Mar 31 2022',
    title: 'Вынести мусор',
    description: '',
    participants: ['Пётр'],
    startTime: '17:00',
    endTime: '17:30',
  },
];

export const eventSlice = createSlice({
  name: 'dayEvent',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<DayEventProps>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((event) => event.id !== action.payload);
    },
    update: (state, action: PayloadAction<DayEventProps>) => {
      return state.map((event) => (event.id === action.payload.id ? action.payload : event));
    },
  },
});

export const { add, update, remove } = eventSlice.actions;

export default eventSlice.reducer;
