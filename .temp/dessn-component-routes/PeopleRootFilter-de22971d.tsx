import React from 'react';
import { PeopleRootFilter } from '../apps/web/components/People/PeopleRootFilter.tsx';
import { useParentState } from '../useIframeState.ts';
import { atom, useAtom } from 'jotai';

// Mock atoms and hooks that the component depends on
const mockRootFilterAtom = atom('active');

// Mock the useViewerIsAdmin hook
const useViewerIsAdmin = () => true;

export default function Preview() {
  const [state, setState] = useParentState({
    isAdmin: {
      type: 'boolean',
      value: true,
      label: 'Is Admin'
    }
  });

  // Use the mock atom
  const [rootFilter, setRootFilter] = useAtom(mockRootFilterAtom);

  return <PeopleRootFilter />;
}