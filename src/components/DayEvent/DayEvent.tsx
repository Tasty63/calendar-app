import React, { useState } from 'react';
import { TimePickerValue } from 'react-time-picker';
import { useAppDispatch } from '../../redux/hooks';
import { remove, update } from '../../redux/reducers/eventSlice';
import { DayEventProps, DayEventParameters } from '../../types/calendar-types';
import EventForm from '../EventForm/EventForm';
import Modal from '../Modal/Modal';
import './DayEvent.scss';

function DayEvent({ draggedDayEvent, setDraggedDayEvent, parameters }: DayEventProps) {
  const { id, title, day, startTime, endTime, description, members } = parameters;

  const [isModalActive, setModalActive] = useState(false);
  const [isDayEventEdit, setEdit] = useState(false);

  const disptach = useAppDispatch();

  const handleCloseModal = () => {
    setModalActive(false);
    setEdit(false);
  };

  const handleDragStart = (event: React.DragEvent, dayParameters: DayEventParameters) => {
    setDraggedDayEvent(dayParameters);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const dayEventElem = target.closest('.day-event') as HTMLDivElement;
    dayEventElem.classList.add('day-event_active');
  };

  const handleDragEnd = (event: React.DragEvent) => {
    const target = event.target as HTMLDivElement;
    const dayEventElem = target.closest('.day-event') as HTMLDivElement;
    dayEventElem.classList.remove('day-event_active');
  };

  const handleDrop = (event: React.DragEvent, dayParameters: DayEventParameters) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const dayEventElem = target.closest('.day-event') as HTMLDivElement;
    dayEventElem.classList.remove('day-event_active');

    if (!draggedDayEvent) {
      return;
    }

    disptach(update({ ...draggedDayEvent, startTime: dayParameters.startTime, endTime: dayParameters.endTime }));
    disptach(update({ ...dayParameters, startTime: draggedDayEvent.startTime, endTime: draggedDayEvent.endTime }));
  };

  return (
    <>
      <div
        className="day-event"
        draggable
        onDragStart={(event) => handleDragStart(event, parameters)}
        onDragLeave={(event) => handleDragEnd(event)}
        onDragEnd={(event) => handleDragEnd(event)}
        onDragOver={(event) => handleDragOver(event)}
        onDrop={(event) => handleDrop(event, parameters)}
        onClick={() => setModalActive(true)}
      >
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
            day={day}
            handleCloseModal={handleCloseModal}
            parameters={{ id, title, day, startTime, endTime, description, members }}
          />
        ) : (
          <div className="day-event__info">
            <div className="div">Title: {title}</div>
            <div className="div">{`Time: ${startTime}-${endTime}`}</div>
            <div className="div">Description: {description}</div>
            <div className="day-event__members">
              Participants:
              {members.map((member, index) => (
                <span key={index} className="day-event__member">
                  {index === members.length - 1 ? member : `${member}, `}
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
