import React, { useState } from 'react';
import { MemberListProps } from '../../types/calendar-types';
import './MemberList.scss';

function MemberList({ list, addMember }: MemberListProps) {
  const [memberName, setMemberName] = useState('');

  const handleAddMember = () => {
    addMember([...list, memberName]);
    setMemberName('');
  };

  return (
    <>
      <label htmlFor="" className="event-form__label">
        Add Event Participants
      </label>
      <input
        type="text"
        minLength={2}
        className="event-form__input"
        value={memberName}
        onChange={(event) => setMemberName(event.target.value)}
      />
      <button type="button" className="event-form__button-add-member" onClick={handleAddMember}>
        +
      </button>
      <div className="event-form__members">
        {list.map((member, index) => (
          <span key={index} className="event-form__member">
            {member}
          </span>
        ))}
      </div>
    </>
  );
}

export default MemberList;
