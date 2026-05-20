// Dashboard page — full view with filter, summary, charts, and expense list.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import SummaryCards from '../components/SummaryCards';
import MonthFilter from '../components/MonthFilter';
import CategoryBarChart from '../components/CategoryBarChart';
import DailyLineChart from '../components/DailyLineChart';
import { getCurrentMonth } from '../lib/expenseUtils';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user, signOut } = useAuth();
  const { expenses, loading, error, deleteExpense, updateExpense } = useExpenses();
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);

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

        <MonthFilter
          expenses={expenses}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        {!loading && (
          <>
            <SummaryCards expenses={filteredExpenses} />
            <CategoryBarChart expenses={filteredExpenses} />
            <DailyLineChart
              expenses={filteredExpenses}
              selectedMonth={selectedMonth}
            />
          </>
        )}

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