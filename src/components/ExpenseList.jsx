// Renders the full expense list with loading, empty, and populated states.

import ExpenseItem from './ExpenseItem';
import Spinner from './Spinner';
import styles from './ExpenseList.module.css';

function ExpenseList({ expenses, loading, onDelete, onUpdate }) {
  if (loading) return <Spinner />;

  if (expenses.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>💸</div>
        <p className={styles.emptyTitle}>No expenses found</p>
        <p className={styles.emptySubtitle}>
          Add your first expense to get started.
        </p>
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
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default ExpenseList;