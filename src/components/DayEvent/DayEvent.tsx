import React from 'react';
import { DayEventProps } from '../../types/calendar-types';

function DayEvent({ id, name, day, time, description, participants }: DayEventProps) {
  return (
    <div className="day-event">
      <div className="day-event__info">
        <div className="div">{name}</div>
        <div className="div">{time}</div>
      </div>
      <div className="day-event__panel">
        <button className="day-event__button-delete">X</button>
        <button className="day-event__button-update">\</button>
      </div>
    </div>
  );
}

export default DayEvent;
