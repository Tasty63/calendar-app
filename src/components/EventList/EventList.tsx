import React, { useState } from 'react';
import { months, noEventsText } from '../../config/constants';
import { EventListProps } from '../../types/calendar-types';
import DayEvent from '../DayEvent/DayEvent';
import EventForm from '../EventForm/EventForm';
import Modal from '../Modal/Modal';
import './EventList.scss';

function EventList({ date, dayEvents }: EventListProps) {
  const [isModalActive, setModalActive] = useState(false);

  return (
    <>
      <div className="event-list">
        <div className="event-list__header">
          <div className="event-list__day">{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</div>
          <button className="event-list__button-add" onClick={() => setModalActive(true)}>
            +
          </button>
        </div>
        <div className="event-list__body">
          {dayEvents.length
            ? dayEvents.map((event) => (
                <DayEvent
                  id={event.id}
                  day={event.day}
                  title={event.title}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  participants={event.participants}
                  key={event.id}
                />
              ))
            : noEventsText}
        </div>
      </div>
      <Modal isActive={isModalActive} setActive={setModalActive}>
        <EventForm setModalActive={setModalActive} date={date} />
      </Modal>
    </>
  );
}

export default EventList;
