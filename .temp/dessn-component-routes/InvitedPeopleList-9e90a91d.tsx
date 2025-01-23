import React from 'react';

// Simplified InvitedPeopleList component
const InvitedPeopleList = () => {
  const mockInvitations = [
    {
      id: '1',
      email: 'john.doe@example.com',
      role: 'Admin',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      role: 'Member',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      email: 'bob.wilson@example.com',
      role: 'Viewer',
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div>
      <h2>Invited People List</h2>
      <ul>
        {mockInvitations.map((invitation) => (
          <li key={invitation.id}>
            {invitation.email} - {invitation.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Preview() {
  return (
    <div className="p-4">
      <InvitedPeopleList />
    </div>
  );
}