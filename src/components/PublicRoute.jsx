// Redirects already-authenticated users away from login and signup pages.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}

export default PublicRoute;