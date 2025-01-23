import React from 'react';
import { PeopleSearchFilter } from '../apps/web/components/People/PeopleSearchFilter.tsx';
import { useParentState } from '../useIframeState.ts';

// Mock Jotai
const mockJotai = {
  useAtom: (atom) => {
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

    if (atom === 'searchAtom') return [state.query.value, (value) => setState('query', value)];
    if (atom === 'roleFilterAtom') return [
      state.roleFilter.value === 'none' ? undefined : state.roleFilter.value,
      (value) => setState('roleFilter', value || 'none')
    ];
    return [];
  },
  useAtomValue: () => {
    const [state] = useParentState({
      rootFilter: {
        type: 'dropdown',
        value: 'active',
        options: ['active', 'inactive'],
        label: 'Root Filter'
      }
    });
    return state.rootFilter.value;
  }
};

// Replace the actual jotai import with our mock
const jotai = mockJotai;

export default function Preview() {
  return <PeopleSearchFilter />;
}