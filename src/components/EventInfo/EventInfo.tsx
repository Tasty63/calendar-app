import React from 'react';
import { EventInfoProps } from '../../types/calendar-types';
import './EventInfo.scss';

function EventInfo({ title, startTime, endTime, description, members }: EventInfoProps) {
  return (
    <div className="event-info">
      <div className="event-info__title">{title}</div>
      <div className="event-info__field">
        <div className="event-info__field-name">Time: </div>
        <div className="event-info__field-info">{`${startTime} - ${endTime}`}</div>
      </div>
      <div className="event-info__field">
        <div className="event-info__field-name">Description: </div>
        <div className="event-info__field-info event-info__field-info_description">{description}</div>
      </div>
      <div className="event-info__field">
        <div className="event-info__field-name">Members: </div>
        <div className="event-info__field-info">
          {members.map(({ name }, index) => (index === members.length - 1 ? name : `${name},`))}
        </div>
      </div>
    </div>
  );
}

export default EventInfo;
