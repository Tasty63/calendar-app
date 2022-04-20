import React from 'react';
import { CalendarDayProps } from '../../types/calendar-types';
import './CalendarDay.scss';

function CalendarDay({ date, isFromCurrentMonth }: CalendarDayProps) {
  const isToday = (date: Date) => {
    return (
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    );
  };

  const dayClassName = isFromCurrentMonth
    ? isToday(date)
      ? 'calendar__day calendar__day_today'
      : 'calendar__day'
    : 'calendar__day calendar__day_other-month';

  return (
    <div key={date.toDateString()} className={dayClassName}>
      {date.getDate()}
    </div>
  );
}

export default CalendarDay;
