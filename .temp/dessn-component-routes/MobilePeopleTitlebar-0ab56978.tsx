import React from 'react';

const MobilePeopleTitlebar = () => {
  return (
    <div className="mobile-people-titlebar">
      <h1>Mobile People Titlebar</h1>
      <p>This is a placeholder for the MobilePeopleTitlebar component.</p>
    </div>
  );
};

export default function Preview() {
  return (
    <div className="flex h-auto gap-1 py-1.5 lg:hidden">
      <MobilePeopleTitlebar />
    </div>
  );
}