import React, { useCallback, useEffect, useState } from 'react';
import { daysInCalendar, months, weekDays } from '../../config/constants';
import CalendarDay from '../CalendarDay/CalendarDay';
import './Calendar.scss';

function Calendar() {
  const [currentDate, setDate] = useState(new Date());
  const [daysArray, setDays] = useState<Date[]>([]);

  const setNextMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const setPrevMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const getDaysScheme = useCallback(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const MonthScheme = [];

    const firstWeekDayNumber = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let index = 0; index < daysInCalendar; index++) {
      if (index < firstWeekDayNumber) {
        MonthScheme.push(new Date(year, month, 0 - firstWeekDayNumber + index + 1));
      } else if (index < daysInMonth + firstWeekDayNumber) {
        MonthScheme.push(new Date(year, month, index - firstWeekDayNumber + 1));
      } else if (index < daysInCalendar) {
        MonthScheme.push(new Date(year, month + 1, index - firstWeekDayNumber - daysInMonth + 1));
      }
    }
    return MonthScheme;
  }, [currentDate]);

  useEffect(() => {
    setDays(getDaysScheme());
  }, [getDaysScheme]);

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
          {weekDays.map((weekDay, index) => (
            <div key={index} className="calendar__weekday">
              {weekDay}
            </div>
          ))}
        </div>
        <div className="calendar__days">
          {daysArray.map((day) => {
            const isFromCurrentMonth = day.getMonth() === currentDate.getMonth();
            return <CalendarDay key={day.toDateString()} date={day} isFromCurrentMonth={isFromCurrentMonth} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
