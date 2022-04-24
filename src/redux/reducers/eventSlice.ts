import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DayEventParameters } from '../../types/calendar-types';

const initialState: DayEventParameters[] = [
  {
    id: 1,
    day: 'Thu Apr 21 2022',
    title: 'Сходить в магазин',
    description: 'Купить: яйца, молоко, хлеб',
    members: [{ id: 1, name: 'Пётр' }],
    startTime: '17:00',
    endTime: '17:15',
  },
  {
    id: 2,
    day: 'Thu Apr 21 2022',
    title: 'Вынести мусор',
    description: 'lorem',
    members: [
      { id: 1, name: 'Пётр' },
      { id: 2, name: 'Алексей' },
      { id: 3, name: 'Александр' },
    ],
    startTime: '17:20',
    endTime: '17:30',
  },
  {
    id: 3,
    day: 'Thu Apr 21 2022',
    title: 'Вынести мусор',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores optio sed natus voluptas. Eaque voluptatum
    fugiat explicabo. Dolores sed, maiores rem id, ut molestiae nesciunt, corporis maxime tempore ea recusandae.`,
    members: [{ id: 1, name: 'Пётр' }],
    startTime: '17:30',
    endTime: '17:32',
  },
  {
    id: 6,
    day: 'Thu Mar 31 2022',
    title: 'Вынести мусор',
    description: '',
    members: [{ id: 1, name: 'Пётр' }],
    startTime: '17:00',
    endTime: '17:30',
  },
];

export const eventSlice = createSlice({
  name: 'dayEvent',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<DayEventParameters>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((event) => event.id !== action.payload);
    },
    update: (state, action: PayloadAction<DayEventParameters>) => {
      return state.map((event) => (event.id === action.payload.id ? action.payload : event));
    },
  },
});

export const { add, update, remove } = eventSlice.actions;

export default eventSlice.reducer;
