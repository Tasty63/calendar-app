import { ReactNode } from 'react';
import { TimePickerValue } from 'react-time-picker';

export interface CalendarDayProps {
  date: Date;
  isFromCurrentMonth: boolean;
}

export interface DayEventParameters {
  id: number;
  day: string;
  title: string;
  startTime: TimePickerValue;
  endTime: TimePickerValue;
  members: string[];
  description: string;
}

export type EventInfoProps = Omit<DayEventParameters, 'id' | 'day'>;

export interface DayEventProps {
  draggedDayEvent: DayEventParameters | null;
  setDraggedDayEvent: React.Dispatch<React.SetStateAction<DayEventParameters | null>>;
  parameters: DayEventParameters;
}

export interface ModalProps {
  isActive: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export interface EventListProps {
  date: Date;
  dayEvents: DayEventParameters[];
}

export interface EventFormProps {
  day: string;
  handleCloseModal: () => void;
  mode: EventFormMode;
  parameters?: DayEventParameters;
}

export type EventFormMode = 'Add' | 'Update';

export interface MemberListProps {
  list: string[];
  addMember: React.Dispatch<React.SetStateAction<string[]>>;
}
