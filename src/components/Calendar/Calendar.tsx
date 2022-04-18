import React from 'react';
import './Calendar.scss';

function Calendar() {
  const getDaysInMonth = () => {
    const date = new Date();

    const month = date.getMonth();
    const year = date.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return new Array(daysInMonth).fill(0);
  };

  const days = getDaysInMonth();
  console.log(days);

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="button-month">{`<`}</div>
        <div className="calendar__current-month">April 2022</div>
        <div className="button-month">{`>`}</div>
      </div>
      <div className="calendar__body">
        <div className="calendar__weekdays">
          <div className="calendar__weekday">Sunday</div>
          <div className="calendar__weekday">Monday</div>
          <div className="calendar__weekday">Tuesday</div>
          <div className="calendar__weekday">Wednesday</div>
          <div className="calendar__weekday">Thursday</div>
          <div className="calendar__weekday">Friday</div>
          <div className="calendar__weekday">Saturday</div>
        </div>
        <div className="calendar__days">
          {days.map((day, index) => (
            <div className="calendar__day">{index + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
