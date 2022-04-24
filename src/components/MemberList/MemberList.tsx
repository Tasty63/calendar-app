import React, { useState } from 'react';
import { MemberListProps } from '../../types/calendar-types';
import './MemberList.scss';

function MemberList({ list, setMembers }: MemberListProps) {
  const [memberName, setMemberName] = useState('');

  const handleAddMember = () => {
    setMembers([...list, { id: new Date().getMilliseconds(), name: memberName }]);
    setMemberName('');
  };

  const handleDeleteMember = (id: number) => {
    setMembers(list.filter((member) => member.id !== id));
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
        {list.map(({ name, id }, index) => (
          <div key={index} className="member-list__member" onClick={() => handleDeleteMember(id)}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberList;
