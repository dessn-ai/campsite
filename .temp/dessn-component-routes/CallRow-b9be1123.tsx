import React from 'react';
import { useParentState } from '../useIframeState.ts';

// Mock implementations
const QueryNormalizerProvider = ({ children }) => <>{children}</>;

const useQuery = () => ({
  data: null,
  isLoading: false,
  error: null,
});

const useGetCurrentUser = () => ({
  data: { id: 'user123', name: 'John Doe' },
  isLoading: false,
  error: null,
});

const useGetCallPeerMembers = () => ({
  data: [],
  isLoading: false,
  error: null,
});

// Simplified CallRow component
const CallRow = ({ call, display, hideProject }) => {
  return (
    <div>
      <h2>{call.title}</h2>
      <p>Duration: {call.recordings_duration}</p>
      <p>Project: {hideProject ? 'Hidden' : call.project.name}</p>
      <p>Display mode: {display}</p>
    </div>
  );
};

export default function Preview() {
  const [state, setState] = useParentState({
    call: {
      type: 'string',
      value: JSON.stringify({
        id: '123',
        title: 'Weekly Team Sync',
        created_at: new Date().toISOString(),
        processing_generated_title: false,
        recordings_duration: '45:00',
        summary_html: '<p>Discussion about upcoming features and project timeline.</p>',
        peers: [],
        project: {
          id: '456',
          name: 'Project Alpha',
          color: 'blue'
        },
        processing_generated_summary: false
      }),
      label: 'Call Data'
    },
    display: {
      type: 'dropdown',
      value: 'default',
      options: ['default', 'search'],
      label: 'Display Mode'
    },
    hideProject: {
      type: 'boolean',
      value: false,
      label: 'Hide Project'
    }
  });

  const parsedCall = React.useMemo(() => {
    try {
      return JSON.parse(state.call.value);
    } catch (error) {
      console.error('Error parsing call data:', error);
      return null;
    }
  }, [state.call.value]);

  if (!parsedCall) {
    return <div>Error: Invalid call data</div>;
  }

  return (
    <QueryNormalizerProvider>
      <CallRow
        call={parsedCall}
        display={state.display.value}
        hideProject={state.hideProject.value}
      />
    </QueryNormalizerProvider>
  );
}