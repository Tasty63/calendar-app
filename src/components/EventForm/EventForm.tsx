import React, { useState } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import { useAppDispatch } from '../../redux/hooks';
import { add, update } from '../../redux/reducers/eventSlice';
import { EventFormProps } from '../../types/calendar-types';
import MemberList from '../MemberList/MemberList';
import './EventForm.scss';

function EventForm({ date, handleCloseModal, mode, parameters }: EventFormProps) {
  const [titleValue, setTitle] = useState(parameters?.title || '');
  const [descriptionValue, setDescription] = useState(parameters?.description || '');
  const [startTimeValue, setStartTime] = useState<TimePickerValue>(parameters?.startTime || '8:00');
  const [endTimeValue, setEndTime] = useState<TimePickerValue>(parameters?.endTime || '8:00');
  const [memberList, addMember] = useState<string[]>(parameters?.participants || []);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleCloseModal();
    mode === 'Update' && parameters
      ? dispatch(
          update({
            id: parameters.id,
            day: parameters.day,
            title: titleValue,
            description: descriptionValue,
            startTime: startTimeValue,
            endTime: endTimeValue,
            participants: memberList,
          })
        )
      : dispatch(
          add({
            id: new Date().getMilliseconds(),
            day: date,
            title: titleValue,
            description: descriptionValue,
            startTime: startTimeValue,
            endTime: endTimeValue,
            participants: memberList,
          })
        );
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
            value={titleValue}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="event-form__field">
          <label htmlFor="" className="event-form__label">
            Event Time
          </label>
          <TimePicker maxTime={endTimeValue} disableClock value={startTimeValue} onChange={setStartTime} />
          -
          <TimePicker disableClock value={endTimeValue} onChange={setEndTime} />
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
            value={descriptionValue}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="event-form__field">
          <MemberList list={memberList} addMember={addMember} />
        </div>
      </div>
      <button type="submit" className="event-form__button-submit">
        Добавить
      </button>
    </form>
  );
}

export default EventForm;
