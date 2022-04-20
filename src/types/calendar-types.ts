import { ReactNode } from 'react';

export interface CalendarDayProps {
  date: Date;
  isFromCurrentMonth: boolean;
}

export interface CalendarState {
  events: DayEvent[];
}

export interface DayEvent {
  id: number;
  day: Date;
  name: string;
  time: Date;
  participants: string[];
  description: string;
}

export type ModalProps = {
  isActive: boolean;
  setActive: (state: boolean) => void;
  children: ReactNode;
};
