import { ReactNode } from 'react';

export interface CalendarDayProps {
  date: Date;
  isFromCurrentMonth: boolean;
}

export interface DayEventProps {
  id: number;
  day: string;
  name: string;
  time: string;
  participants: string[];
  description: string;
}

export interface ModalProps {
  isActive: boolean;
  setActive: (state: boolean) => void;
  children: ReactNode;
}

export interface EventListProps {
  date: Date;
  events: DayEventProps[];
}
