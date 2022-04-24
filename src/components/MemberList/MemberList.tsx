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
    <div className="member-list">
      <div className="member-list__field">
        <input
          type="text"
          placeholder="Add Event Members"
          className="member-list__input"
          value={memberName}
          onChange={(event) => setMemberName(event.target.value)}
        />
        <button type="button" className="member-list__button-add" onClick={handleAddMember}>
          +
        </button>
      </div>
      <div className="member-list__members">
        {list.map((member, index) => (
          <div key={index} className="member-list__member">
            {member}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberList;
