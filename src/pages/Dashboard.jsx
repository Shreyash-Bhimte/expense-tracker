// Dashboard page — primary view showing expense list and navigation.
// Charts and summary stats added in Commits 9–11.

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user, signOut } = useAuth();
  const { expenses, loading, error, deleteExpense } = useExpenses();
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await deleteExpense(id);
    } catch (err) {
      alert('Failed to delete expense: ' + err.message);
    }
  }

  return (
    <div className={styles.page}>
      {/* Top navigation bar */}
      <nav className={styles.nav}>
        <span className={styles.navBrand}>ExpenseTracker</span>
        <div className={styles.navRight}>
          <span className={styles.navEmail}>{user?.email}</span>
          <button className={styles.signOutButton} onClick={signOut}>
            Sign out
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.header}>
          <h1 className={styles.heading}>My Expenses</h1>
          <button
            className={styles.addButton}
            onClick={() => navigate('/add')}
          >
            + Add Expense
          </button>
        </div>

        {/* Error state */}
        {error && (
          <p className={styles.error}>Failed to load expenses: {error}</p>
        )}

        {/* Expense list */}
        <ExpenseList
          expenses={expenses}
          loading={loading}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default Dashboard;