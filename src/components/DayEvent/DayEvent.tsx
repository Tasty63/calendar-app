import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { remove } from '../../redux/reducers/eventSlice';
import { DayEventProps } from '../../types/calendar-types';
import Modal from '../Modal/Modal';
import './DayEvent.scss';

function DayEvent({ id, title, day, time, description, participants }: DayEventProps) {
  const disptach = useAppDispatch();
  const [isActive, setActive] = useState(false);

  return (
    <>
      <div className="day-event" onClick={() => setActive(true)}>
        <div className="day-event__title">{title}</div>
        <div className="day-event__time">{time}</div>

        <div className="day-event__panel">
          <button className="day-event__button-delete" onClick={() => disptach(remove(id))}>
            X
          </button>
          <button className="day-event__button-update">\</button>
        </div>
      </div>
      <Modal isActive={isActive} setActive={setActive}>
        <div className="div">{title}</div>
        <div className="div">{description}</div>
        <div className="div">{participants}</div>
        <div className="div">{}</div>
        <div className="div">{}</div>
      </Modal>
    </>
  );
}

export default DayEvent;
