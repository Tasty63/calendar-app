import React, { useState } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import { noTitleText } from '../../config/constants';
import { useAppDispatch } from '../../redux/hooks';
import { add, update } from '../../redux/reducers/eventSlice';
import { DayEventParameters, EventFormProps, Member } from '../../types/calendar-types';
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

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const eventId = mode === 'Update' && parameters ? parameters.id : new Date().getMilliseconds();
    const eventParameters: DayEventParameters = {
      id: eventId,
      day: day,
      title: titleValue || noTitleText,
      description: descriptionValue,
      startTime: startTimeValue,
      endTime: endTimeValue,
      members: memberList,
    };

    mode === 'Update' && parameters ? dispatch(update(eventParameters)) : dispatch(add(eventParameters));
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
          <div className="event-form__time">
            <TimePicker
              className="event-form__time-input"
              disableClock
              required
              value={startTimeValue}
              onChange={handleTimeStartChange}
            />
            <div className="dash">&#8212;</div>
            <TimePicker
              className="event-form__time-input"
              disableClock
              required
              minTime={startTimeValue}
              value={endTimeValue}
              onChange={setEndTime}
            />
          </div>
        </div>

        <div className="event-form__field">
          <textarea
            name="description"
            placeholder="Event Description"
            className="event-form__input event-form__input_description"
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
