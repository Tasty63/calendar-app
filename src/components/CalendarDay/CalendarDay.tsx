import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { CalendarDayProps } from '../../types/calendar-types';
import EventList from '../EventList/EventList';
import Modal from '../Modal/Modal';
import './CalendarDay.scss';

function CalendarDay({ date, isFromCurrentMonth }: CalendarDayProps) {
  const [isModalActive, setModalActive] = useState(false);
  const dayEvents = useAppSelector((state) =>
    state.dayEvents.filter((dayEvent) => dayEvent.day === date.toDateString())
  );

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  const dayClassName = isFromCurrentMonth
    ? isToday(date)
      ? 'calendar__day calendar__day_today'
      : 'calendar__day'
    : 'calendar__day calendar__day_other-month';

  return (
    <>
      <div className={dayClassName} onClick={() => setModalActive(true)}>
        {date.getDate()}
      </div>
      <Modal isActive={isModalActive} handleClose={() => setModalActive(false)}>
        <EventList date={date} dayEvents={dayEvents} />
      </Modal>
    </>
  );
}

export default CalendarDay;
