import React from 'react';

// Mocking PeopleIndexEmptyState component
const PeopleIndexEmptyState = ({ description }) => (
  <div>
    <h2>People Index Empty State</h2>
    <p>{description}</p>
  </div>
);

// Mocking useParentState hook
const useParentState = (initialState) => {
  const [state, setState] = React.useState(initialState);
  return [state, setState];
};

export default function Preview() {
  const [state, setState] = useParentState({
    description: {
      type: 'string',
      value: 'Custom description for the empty state',
      label: 'Description'
    }
  });

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <PeopleIndexEmptyState 
          description={state.description.value}
        />
      </ErrorBoundary>
    </React.Suspense>
  );
}

// Simple ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}