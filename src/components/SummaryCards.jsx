// Displays total spent and per-category breakdown for the filtered month.
// All values are derived — this component only receives and displays data.

import { getTotalSpent, getCategoryBreakdown } from '../lib/expenseUtils';
import styles from './SummaryCards.module.css';

function SummaryCards({ expenses }) {
  const total     = getTotalSpent(expenses);
  const breakdown = getCategoryBreakdown(expenses);

  return (
    <div className={styles.grid}>
      {/* Total spent card */}
      <div className={styles.card}>
        <p className={styles.label}>Total Spent</p>
        <p className={styles.value}>
          ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
        <p className={styles.subValue}>
          {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Category breakdown card */}
      <div className={styles.card}>
        <p className={styles.label}>By Category</p>
        {breakdown.length === 0 ? (
          <p className={styles.subValue}>No data</p>
        ) : (
          breakdown.map(item => (
            <div key={item.category} className={styles.categoryRow}>
              <span className={styles.categoryLabel}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <span className={styles.categoryAmount}>
                ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SummaryCards;