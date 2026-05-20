// Guards routes that require authentication.
// Redirects unauthenticated users to /login before any protected page renders.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for the initial session check to complete before making
  // any redirect decision — prevents flashing /login for logged-in users
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  // No authenticated user — redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated — render the requested page
  return children;
}

export default ProtectedRoute;