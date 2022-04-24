import React, { useState } from 'react';
import { months, noEventsText } from '../../config/constants';
import { DayEventParameters, EventListProps } from '../../types/calendar-types';
import DayEvent from '../DayEvent/DayEvent';
import EventForm from '../EventForm/EventForm';
import Modal from '../Modal/Modal';
import './EventList.scss';

function EventList({ date, dayEvents }: EventListProps) {
  const [isModalActive, setModalActive] = useState(false);
  const [draggedDayEvent, setDraggedDayEvent] = useState<DayEventParameters | null>(null);

  const sortByStartHours = (firstEvent: DayEventParameters, secondEvent: DayEventParameters) => {
    return (
      parseInt((firstEvent.startTime as string).replace(':', ''), 10) -
      parseInt((secondEvent.startTime as string).replace(':', ''), 10)
    );
  };

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
            ? dayEvents
                .sort(sortByStartHours)
                .map(({ id, day, title, startTime, endTime, description, members }) => (
                  <DayEvent
                    parameters={{ id, day, title, startTime, endTime, description, members }}
                    draggedDayEvent={draggedDayEvent}
                    setDraggedDayEvent={setDraggedDayEvent}
                    key={id}
                  />
                ))
            : noEventsText}
        </div>
      </div>
      <Modal isActive={isModalActive} handleClose={() => setModalActive(false)}>
        <EventForm handleCloseModal={() => setModalActive(false)} day={date.toDateString()} mode="Add" />
      </Modal>
    </>
  );
}

export default EventList;
