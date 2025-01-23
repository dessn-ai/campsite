import React from 'react';

const PeopleList = () => {
  return (
    <div>
      <h1>People List</h1>
      <ul>
        <li>John Doe</li>
        <li>Jane Smith</li>
        <li>Bob Johnson</li>
      </ul>
    </div>
  );
};

export default function Preview() {
  return <PeopleList />;
}