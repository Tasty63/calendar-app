import React, { useState } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import { noTitleText } from '../../config/constants';
import { useAppDispatch } from '../../redux/hooks';
import { add, update } from '../../redux/reducers/eventSlice';
import { EventFormProps } from '../../types/calendar-types';
import MemberList from '../MemberList/MemberList';
import './EventForm.scss';

function EventForm({ day, handleCloseModal, mode, parameters }: EventFormProps) {
  const [titleValue, setTitle] = useState(parameters?.title || '');
  const [descriptionValue, setDescription] = useState(parameters?.description || '');
  const [startTimeValue, setStartTime] = useState<TimePickerValue>(parameters?.startTime || '09:00');
  const [endTimeValue, setEndTime] = useState<TimePickerValue>(parameters?.endTime || '10:00');
  const [memberList, addMember] = useState<string[]>(parameters?.members || []);

  const handleTimeStartChange = (value: TimePickerValue) => {
    if (value > endTimeValue) {
      setEndTime(value);
    }
    setStartTime(value);
  };

  const handleEndTimeChange = (value: TimePickerValue) => {
    if (value < startTimeValue) {
      setStartTime(value);
    }
    setEndTime(value);
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    mode === 'Update' && parameters
      ? dispatch(
          update({
            id: parameters.id,
            day: parameters.day,
            title: titleValue || noTitleText,
            description: descriptionValue,
            startTime: startTimeValue,
            endTime: endTimeValue,
            members: memberList,
          })
        )
      : dispatch(
          add({
            id: new Date().getMilliseconds(),
            day,
            title: titleValue || noTitleText,
            description: descriptionValue,
            startTime: startTimeValue,
            endTime: endTimeValue,
            members: memberList,
          })
        );
    handleCloseModal();
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
          <TimePicker disableClock value={startTimeValue} onChange={handleTimeStartChange} />
          -
          <TimePicker disableClock value={endTimeValue} onChange={handleEndTimeChange} />
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
        Сохранить
      </button>
    </form>
  );
}

export default EventForm;
