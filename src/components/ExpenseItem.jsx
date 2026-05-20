// Renders a single expense row with delete action.
// Receives expense data and callbacks as props — owns no state.

import { getCategoryColor } from '../lib/categories';
import styles from './ExpenseItem.module.css';

function ExpenseItem({ expense, onDelete }) {
  const color = getCategoryColor(expense.category);

  // Format date from ISO string (YYYY-MM-DD) to readable format
  const formattedDate = new Date(expense.date + 'T00:00:00')
    .toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  function handleDelete() {
    // Confirm before destructive action
    if (window.confirm(`Delete this ${expense.category} expense of ₹${expense.amount}?`)) {
      onDelete(expense.id);
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span
          className={styles.categoryDot}
          style={{ backgroundColor: color }}
        />
        <div>
          <p className={styles.category}>{expense.category}</p>
          <p className={styles.note}>{expense.note || '—'}</p>
        </div>
      </div>

      <div className={styles.right}>
        <div style={{ textAlign: 'right' }}>
          <p className={styles.amount}>₹{Number(expense.amount).toLocaleString('en-IN')}</p>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            aria-label="Delete expense"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;