import React from 'react';
import { PeopleSearchFilter } from '../apps/web/components/People/PeopleSearchFilter.tsx';

import { useParentState } from '../useIframeState.ts';

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

  // Mock the Jotai atoms and their setters
  const jotaiMock = {
    searchAtom: [state.query.value, (value: string) => setState('query', value)],
    roleFilterAtom: [
      state.roleFilter.value === 'none' ? undefined : state.roleFilter.value,
      (value: string | undefined) => setState('roleFilter', value || 'none')
    ],
    rootFilterAtom: state.rootFilter.value
  };

  // Mock the Jotai hooks
  jest.mock('jotai', () => ({
    useAtom: (atom: string) => {
      if (atom === 'searchAtom') return jotaiMock.searchAtom;
      if (atom === 'roleFilterAtom') return jotaiMock.roleFilterAtom;
      return [];
    },
    useAtomValue: () => jotaiMock.rootFilterAtom
  }));

  return <PeopleSearchFilter />;
}