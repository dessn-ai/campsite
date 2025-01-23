import React from 'react';
import { useParentState } from '../useIframeState.ts';

interface PeopleSearchFilterProps {
  query: string;
  setQuery: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  rootFilter: string;
}

const PeopleSearchFilter: React.FC<PeopleSearchFilterProps> = ({
  query,
  setQuery,
  roleFilter,
  setRoleFilter,
  rootFilter,
}) => {
  if (rootFilter !== 'active') return null;

  return (
    <div>
      <h2>People Search Filter</h2>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="none">All roles</option>
        <option value="admin">Admins</option>
        <option value="member">Members</option>
        <option value="viewer">Viewers</option>
        <option value="guest">Guests</option>
      </select>
    </div>
  );
};

export default function Preview() {
  const [state, setState] = useParentState({
    query: {
      type: 'string',
      value: '',
      label: 'Search Query'
    },
    roleFilter: {
      type: 'dropdown',
      value: 'none',
      options: ['none', 'admin', 'member', 'viewer', 'guest'],
      label: 'Role Filter'
    },
    rootFilter: {
      type: 'dropdown',
      value: 'active',
      options: ['active', 'inactive'],
      label: 'Root Filter'
    }
  });

  const setQuery = (value: string) => setState('query', value);
  const setRoleFilter = (value: string) => setState('roleFilter', value);

  return (
    <PeopleSearchFilter
      query={state.query.value}
      setQuery={setQuery}
      roleFilter={state.roleFilter.value}
      setRoleFilter={setRoleFilter}
      rootFilter={state.rootFilter.value}
    />
  );
}