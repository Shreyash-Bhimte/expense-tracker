// Dashboard page — placeholder with navigation to add expense.
// Full dashboard UI built in Commits 7–11.

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useExpenses } from '../hooks/useExpenses';

function Dashboard() {
  const { user, signOut } = useAuth();
  const { expenses, loading } = useExpenses();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/add')}>+ Add Expense</button>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>

      <p>Logged in as: {user?.email}</p>

      {loading && <p>Loading expenses...</p>}

      {!loading && expenses.length === 0 && (
        <p>No expenses yet. Add your first one.</p>
      )}

      {!loading && expenses.map(expense => (
        <div key={expense.id} style={{ padding: '12px', border: '1px solid #eee', marginTop: '8px' }}>
          <strong>{expense.category}</strong> — ₹{expense.amount} on {expense.date}
          {expense.note && <span> — {expense.note}</span>}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;