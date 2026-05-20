// Pure utility functions for expense calculations.
// No React dependencies — easy to test and reuse anywhere.

import { CATEGORIES } from './categories';

/**
 * Returns total of all expense amounts in an array.
 */
export function getTotalSpent(expenses) {
  return expenses.reduce((sum, e) => sum + Number(e.amount), 0);
}

/**
 * Returns an array of { category, total, color } objects
 * for all categories, including those with zero spend.
 */
export function getCategoryBreakdown(expenses) {
  return CATEGORIES.map(cat => {
    const total = expenses
      .filter(e => e.category === cat.value)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    return {
      category: cat.value,
      label:    cat.label,
      color:    cat.color,
      total,
    };
  }).filter(item => item.total > 0); // omit categories with no spend
}

/**
 * Returns YYYY-MM string for today — used as default filter value.
 */
export function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7);
}

/**
 * Returns a human-readable month label from a YYYY-MM string.
 * e.g. "2025-01" → "January 2025"
 */
export function formatMonthLabel(yearMonth) {
  const [year, month] = yearMonth.split('-');
  return new Date(year, month - 1).toLocaleDateString('en-IN', {
    month: 'long',
    year:  'numeric',
  });
}