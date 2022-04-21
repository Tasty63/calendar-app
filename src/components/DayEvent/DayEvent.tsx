import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { remove } from '../../redux/reducers/eventSlice';
import { DayEventProps } from '../../types/calendar-types';
import Modal from '../Modal/Modal';
import './DayEvent.scss';

function DayEvent({ id, title, day, startTime, endTime, description, participants }: DayEventProps) {
  const disptach = useAppDispatch();
  const [isModalActive, setModalActive] = useState(false);

  return (
    <>
      <div className="day-event" onClick={() => setModalActive(true)}>
        <div className="day-event__title">{title}</div>
        <div className="day-event__time">{`${startTime}-${endTime}`}</div>
        <div className="day-event__panel">
          <button className="day-event__button-delete" onClick={() => disptach(remove(id))}>
            X
          </button>
          <button className="day-event__button-update">\</button>
        </div>
      </div>
      <Modal isActive={isModalActive} setActive={setModalActive}>
        <div className="div">Title: {title}</div>
        <div className="div">{`Time: ${startTime}-${endTime}`}</div>
        <div className="div">Description: {description}</div>
        <div className="div">Participants: {participants}</div>
      </Modal>
    </>
  );
}

export default DayEvent;
