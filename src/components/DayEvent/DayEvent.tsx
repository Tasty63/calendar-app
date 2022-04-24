import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { remove, update } from '../../redux/reducers/eventSlice';
import { DayEventProps, DayEventParameters } from '../../types/calendar-types';
import { getClosestElement } from '../../utils/utils';
import EventForm from '../EventForm/EventForm';
import EventInfo from '../EventInfo/EventInfo';
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

    const dayEventElem = getClosestElement(event.target, '.day-event');
    dayEventElem && dayEventElem.classList.add('day-event_active');
  };

  const handleDragEnd = (event: React.DragEvent) => {
    const dayEventElem = getClosestElement(event.target, '.day-event');
    dayEventElem && dayEventElem.classList.remove('day-event_active');
  };

  const handleDrop = (event: React.DragEvent, dayParameters: DayEventParameters) => {
    event.preventDefault();

    if (!draggedDayEvent) {
      return;
    }

    const dayEventElem = getClosestElement(event.target, '.day-event');
    dayEventElem && dayEventElem.classList.remove('day-event_active');

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
          <EventInfo
            title={title}
            startTime={startTime}
            endTime={endTime}
            description={description}
            members={members}
          />
        )}
      </Modal>
    </>
  );
}

export default DayEvent;
