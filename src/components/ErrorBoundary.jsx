// Class component — catches render errors in any child component tree.
// Displays a fallback UI instead of crashing the entire page.
// Note: error boundaries must be class components — no hook equivalent exists.

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>⚠️</p>
          <h2 style={{ marginBottom: '8px', color: '#1a1a1a' }}>Something went wrong</h2>
          <p style={{ color: '#888', marginBottom: '24px', fontSize: '0.9rem' }}>
            {this.state.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#4F6EF7',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;