// Dashboard page — placeholder until Commit 6.
// Confirms auth redirect is working correctly.

import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Dashboard</h1>
      <p>Logged in as: {user?.email}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Dashboard;