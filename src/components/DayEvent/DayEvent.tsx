import React from 'react';
import { DayEventProps } from '../../types/calendar-types';
import './DayEvent.scss';

function DayEvent({ id, name, day, time, description, participants }: DayEventProps) {
  return (
    <div className="day-event">
      <div className="day-event__name">{name}</div>
      <div className="day-event__time">{time}</div>

      <div className="day-event__panel">
        <button className="day-event__button-delete">X</button>
        <button className="day-event__button-update">\</button>
      </div>
    </div>
  );
}

export default DayEvent;
