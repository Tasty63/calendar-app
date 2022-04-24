import React, { useState } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import { noTitleText } from '../../config/constants';
import { useAppDispatch } from '../../redux/hooks';
import { add, update } from '../../redux/reducers/eventSlice';
import { EventFormProps, Member } from '../../types/calendar-types';
import MemberList from '../MemberList/MemberList';
import './EventForm.scss';

function EventForm({ day, handleCloseModal, mode, parameters }: EventFormProps) {
  const [titleValue, setTitle] = useState(parameters?.title || '');
  const [descriptionValue, setDescription] = useState(parameters?.description || '');
  const [startTimeValue, setStartTime] = useState<TimePickerValue>(parameters?.startTime || '09:00');
  const [endTimeValue, setEndTime] = useState<TimePickerValue>(parameters?.endTime || '10:00');
  const [memberList, setMembers] = useState<Member[]>(parameters?.members || []);

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
          <input
            type="text"
            className="event-form__input"
            placeholder="Event Title"
            value={titleValue}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="event-form__field">
          <div className="event-form__time time">
            <TimePicker
              className="time__input"
              hourHandWidth={20}
              disableClock
              value={startTimeValue}
              onChange={handleTimeStartChange}
            />
            <div className="dash">&#8212;</div>
            <TimePicker className="time__input" disableClock value={endTimeValue} onChange={handleEndTimeChange} />
          </div>
        </div>

        <div className="event-form__field">
          <textarea
            name=""
            id=""
            placeholder="Event Description"
            className="event-form__description"
            value={descriptionValue}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="event-form__field">
          <MemberList list={memberList} setMembers={setMembers} />
        </div>
      </div>

      <button type="submit" className="event-form__button-submit">
        Save
      </button>
    </form>
  );
}

export default EventForm;
