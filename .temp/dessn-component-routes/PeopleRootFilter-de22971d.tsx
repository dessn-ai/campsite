import React from 'react';
import { PeopleRootFilter } from '../apps/web/components/People/PeopleRootFilter.tsx';

import { useParentState } from '../useIframeState.ts';
import { atom } from 'jotai';

// Mock atoms and hooks that the component depends on
const mockRootFilterAtom = atom('active');

// Mock the useViewerIsAdmin hook
const mockUseViewerIsAdmin = () => true;

// Override the imports in the component's module
jest.mock('jotai', () => ({
  useAtom: () => ['active', () => {}],
}));

jest.mock('../../hooks/useViewerIsAdmin.ts', () => ({
  useViewerIsAdmin: () => true,
}));

export default function Preview() {
  const [state, setState] = useParentState({
    isAdmin: {
      type: 'boolean',
      value: true,
      label: 'Is Admin'
    }
  });

  return <PeopleRootFilter />;
}