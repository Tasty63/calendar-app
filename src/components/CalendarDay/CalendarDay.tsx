import React, { useState } from 'react';
import { CalendarDayProps } from '../../types/calendar-types';
import Modal from '../Modal/Modal';
import './CalendarDay.scss';

function CalendarDay({ date, isFromCurrentMonth }: CalendarDayProps) {
  const [isModalActive, setModalActive] = useState(false);

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
    <>
      <div key={date.toDateString()} className={dayClassName} onClick={() => setModalActive(true)}>
        {date.getDate()}
      </div>
      <Modal isActive={isModalActive} setActive={setModalActive}>
        <div className="events">events</div>
      </Modal>
    </>
  );
}

export default CalendarDay;
