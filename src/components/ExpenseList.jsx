// Renders the full list of expenses.
// Handles loading, empty, and populated states explicitly.

import ExpenseItem from './ExpenseItem';
import styles from './ExpenseList.module.css';

function ExpenseList({ expenses, loading, onDelete }) {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        Loading expenses...
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>💸</div>
        <p className={styles.emptyTitle}>No expenses found</p>
        <p className={styles.emptySubtitle}>Add your first expense to get started.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {expenses.map(expense => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ExpenseList;