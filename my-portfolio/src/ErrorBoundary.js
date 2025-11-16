import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log error details for debugging
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="container py-4">
          <div className="alert alert-danger" role="alert">
            <h5 className="alert-heading mb-2">Something went wrong loading this view.</h5>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error && (error.stack || error.message || error))}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
