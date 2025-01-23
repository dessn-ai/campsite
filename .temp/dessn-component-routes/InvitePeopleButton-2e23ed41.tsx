import React from 'react';

const InvitePeopleButton: React.FC<{
  variant?: string;
  label?: string;
  fullWidth?: boolean;
  size?: string;
}> = ({ variant = 'primary', label = 'Invite people', fullWidth = false, size = 'base' }) => {
  return (
    <button
      style={{
        backgroundColor: variant === 'primary' ? '#007bff' : '#f8f9fa',
        color: variant === 'primary' ? 'white' : 'black',
        padding: size === 'sm' ? '0.25rem 0.5rem' : size === 'large' ? '0.5rem 1rem' : '0.375rem 0.75rem',
        width: fullWidth ? '100%' : 'auto',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
};

export default function Preview() {
  return (
    <div>
      <h2>Invite People Button Preview</h2>
      <InvitePeopleButton />
      <InvitePeopleButton variant="flat" label="Add Team Members" size="large" />
      <InvitePeopleButton variant="primary" label="Invite" size="sm" fullWidth />
    </div>
  );
}