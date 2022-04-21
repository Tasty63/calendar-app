import React from 'react';
import { months } from '../../config/constants';
import { EventListProps } from '../../types/calendar-types';
import DayEvent from '../DayEvent/DayEvent';
import './EventList.scss';

function EventList({ date, events }: EventListProps) {
  return (
    <div className="event-list">
      <div className="event-list__header">
        <span>{date.getDate()}</span>
        <span>{months[date.getMonth()]}</span>
        <span>{date.getFullYear()}</span>
      </div>
      <div className="event-list__body">
        {events.map((event) => (
          <DayEvent
            id={event.id}
            day={event.day}
            name={event.name}
            time={event.time}
            description={event.description}
            participants={event.participants}
            key={event.id}
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;
