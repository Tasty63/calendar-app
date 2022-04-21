import React from 'react';
import { months, noEventsText } from '../../config/constants';
import { EventListProps } from '../../types/calendar-types';
import DayEvent from '../DayEvent/DayEvent';
import './EventList.scss';

function EventList({ date, events }: EventListProps) {
  return (
    <div className="event-list">
      <div className="event-list__header">
        <div className="event-list__day">{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</div>
      </div>
      <div className="event-list__body">
        {events.length
          ? events.map((event) => (
              <DayEvent
                id={event.id}
                day={event.day}
                name={event.name}
                time={event.time}
                description={event.description}
                participants={event.participants}
                key={event.id}
              />
            ))
          : noEventsText}
      </div>
    </div>
  );
}

export default EventList;
