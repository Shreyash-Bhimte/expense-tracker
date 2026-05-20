// Dashboard page — expense list with monthly filter and summary stats.
// Charts added in Commits 10–11.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import SummaryCards from '../components/SummaryCards';
import MonthFilter from '../components/MonthFilter';
import { getCurrentMonth } from '../lib/expenseUtils';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user, signOut } = useAuth();
  const { expenses, loading, error, deleteExpense, updateExpense } = useExpenses();
  const navigate = useNavigate();

  // Filter state — defaults to current month
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);

  // Derived — no extra state needed
  const filteredExpenses = expenses.filter(e =>
    e.date.startsWith(selectedMonth)
  );

  async function handleDelete(id) {
    try {
      await deleteExpense(id);
    } catch (err) {
      alert('Failed to delete expense: ' + err.message);
    }
  }

  async function handleUpdate(id, changes) {
    await updateExpense(id, changes);
  }

  return (
    <div className={styles.page}>
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
        <div className={styles.header}>
          <h1 className={styles.heading}>My Expenses</h1>
          <button
            className={styles.addButton}
            onClick={() => navigate('/add')}
          >
            + Add Expense
          </button>
        </div>

        {error && (
          <p className={styles.error}>Failed to load expenses: {error}</p>
        )}

        {/* Month selector */}
        <MonthFilter
          expenses={expenses}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        {/* Summary stats for filtered month */}
        {!loading && (
          <SummaryCards expenses={filteredExpenses} />
        )}

        {/* Filtered expense list */}
        <ExpenseList
          expenses={filteredExpenses}
          loading={loading}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </main>
    </div>
  );
}

export default Dashboard;