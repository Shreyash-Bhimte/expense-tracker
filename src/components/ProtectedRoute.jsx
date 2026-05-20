// Guards routes that require authentication.
// Redirects unauthenticated users to /login before any protected page renders.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Await initial session resolution before making any redirect decision
  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;