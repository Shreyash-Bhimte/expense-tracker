// Renders a dropdown to filter expenses by month.
// Derives available months from the expenses array so only
// months with actual data appear as options.

import styles from './MonthFilter.module.css';
import { formatMonthLabel } from '../lib/expenseUtils';

function MonthFilter({ expenses, selectedMonth, onMonthChange }) {
  // Build a unique sorted list of YYYY-MM values present in the data
  const availableMonths = [...new Set(
    expenses.map(e => e.date.slice(0, 7))
  )].sort((a, b) => b.localeCompare(a)); // newest first

  // Ensure the currently selected month is always in the list
  // (handles the case where no expenses exist yet for this month)
  if (!availableMonths.includes(selectedMonth)) {
    availableMonths.unshift(selectedMonth);
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="monthFilter">Month</label>
      <select
        id="monthFilter"
        className={styles.select}
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
      >
        {availableMonths.map(month => (
          <option key={month} value={month}>
            {formatMonthLabel(month)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthFilter;