import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { remove } from '../../redux/reducers/eventSlice';
import { DayEventProps } from '../../types/calendar-types';
import EventForm from '../EventForm/EventForm';
import Modal from '../Modal/Modal';
import './DayEvent.scss';

function DayEvent({ id, title, day, startTime, endTime, description, participants }: DayEventProps) {
  const disptach = useAppDispatch();
  const [isModalActive, setModalActive] = useState(false);
  const [isDayEventEdit, setEdit] = useState(false);

  const handleCloseModal = () => {
    setModalActive(false);
    setEdit(false);
  };

  return (
    <>
      <div className="day-event" onClick={() => setModalActive(true)}>
        <div className="day-event__title">{title}</div>
        <div className="day-event__time">{`${startTime}-${endTime}`}</div>
        <div className="day-event__panel">
          <button className="day-event__button-delete" onClick={() => disptach(remove(id))}>
            X
          </button>
          <button
            className="day-event__button-update"
            onClick={() => {
              setEdit(true);
              setModalActive(true);
            }}
          >
            \
          </button>
        </div>
      </div>
      <Modal isActive={isModalActive} handleClose={handleCloseModal}>
        {isDayEventEdit ? (
          <EventForm
            mode={'Update'}
            date={day}
            handleCloseModal={handleCloseModal}
            parameters={{ id, title, day, startTime, endTime, description, participants }}
          />
        ) : (
          <div className="day-event__info">
            <div className="div">Title: {title}</div>
            <div className="div">{`Time: ${startTime}-${endTime}`}</div>
            <div className="div">Description: {description}</div>
            <div className="day-event__members">
              Participants:
              {participants.map((member, index) => (
                <span key={index} className="day-event__member">
                  {index === participants.length - 1 ? member : `${member}, `}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default DayEvent;
