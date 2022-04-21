import React, { useState } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import { useAppDispatch } from '../../redux/hooks';
import { add } from '../../redux/reducers/eventSlice';
import { EventFormProps } from '../../types/calendar-types';
import './EventForm.scss';

function EventForm({ date, setModalActive }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<TimePickerValue>('8:00');
  const [endTime, setEndTime] = useState<TimePickerValue>('8:00');

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      add({
        id: new Date().getMilliseconds(),
        day: date.toDateString(),
        title,
        description,
        startTime,
        endTime,
        participants: [''],
      })
    );
    setModalActive(false);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form__inputs">
        <div className="event-form__field">
          <label htmlFor="" className="event-form__label">
            Event Title
          </label>
          <input
            type="text"
            className="event-form__input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="event-form__field">
          <label htmlFor="" className="event-form__label">
            Event Time
          </label>
          <TimePicker disableClock value={startTime} onChange={setStartTime} />
          -
          <TimePicker disableClock value={endTime} onChange={setEndTime} />
        </div>
        <div className="event-form__field">
          <label htmlFor="" className="event-form__label">
            Event Description
          </label>
          <textarea
            name=""
            id=""
            cols={20}
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="event-form__field">
          <label htmlFor="" className="event-form__label">
            Add Event Participants
          </label>
          <input type="text" className="event-form__input" />
        </div>
      </div>
      <button type="submit" className="event-form__button-submit">
        Добавить
      </button>
    </form>
  );
}

export default EventForm;