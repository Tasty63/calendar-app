import { ReactNode } from 'react';
import { TimePickerValue } from 'react-time-picker';

export interface CalendarDayProps {
  date: Date;
  isFromCurrentMonth: boolean;
}

export interface DayEventProps {
  id: number;
  day: string;
  title: string;
  startTime: TimePickerValue;
  endTime: TimePickerValue;
  participants: string[];
  description: string;
}

export interface ModalProps {
  isActive: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export interface EventListProps {
  date: Date;
  dayEvents: DayEventProps[];
}

export interface EventFormProps {
  date: string;
  handleCloseModal: () => void;
  mode: EventFormMode;
  parameters?: DayEventProps;
}

export type EventFormMode = 'Add' | 'Update';

export interface MemberListProps {
  list: string[];
  addMember: React.Dispatch<React.SetStateAction<string[]>>;
}
