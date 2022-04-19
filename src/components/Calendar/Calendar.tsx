import React, { useEffect, useState } from 'react';
import { months, weekDays } from '../config/constants';
import './Calendar.scss';

function Calendar() {
  const [currentDate, setDate] = useState(new Date());
  const [daysMatrix, setDays] = useState<Number[]>([]);

  const setNextMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const setPrevMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const getDaysInMonth = () => {
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstWeekDayNumber = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return new Array(firstWeekDayNumber + daysInMonth).fill(null, 0, firstWeekDayNumber).fill(0, firstWeekDayNumber);
  };

  useEffect(() => {
    setDays(getDaysInMonth());
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="button-month" onClick={setPrevMonth}>{`<`}</div>
        <div className="calendar__current-month">{`${
          months[currentDate.getMonth()]
        } ${currentDate.getFullYear()}`}</div>
        <div className="button-month" onClick={setNextMonth}>{`>`}</div>
      </div>
      <div className="calendar__body">
        <div className="calendar__weekdays">
          {weekDays.map((weekDay) => (
            <div className="calendar__weekday">{weekDay}</div>
          ))}
        </div>
        <div className="calendar__days">
          {daysMatrix.map((day, index) => {
            return day === null ? (
              <div key={index} className="calendar__empty"></div>
            ) : (
              <div key={index} className="calendar__day">
                {index - daysMatrix.filter((day) => day === null).length + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
