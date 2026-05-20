// Category definitions — single source of truth for labels and colors.
// Import this wherever categories are displayed or filtered.

export const CATEGORIES = [
  { value: 'Food',       label: 'Food',       color: '#FF6B6B' },
  { value: 'Transport',  label: 'Transport',  color: '#4ECDC4' },
  { value: 'Shopping',   label: 'Shopping',   color: '#A78BFA' },
  { value: 'Bills',      label: 'Bills',      color: '#F59E0B' },
  { value: 'Health',     label: 'Health',     color: '#34D399' },
  { value: 'Other',      label: 'Other',      color: '#94A3B8' },
];

// Lookup helper — returns the hex color for a given category value
export function getCategoryColor(value) {
  return CATEGORIES.find(c => c.value === value)?.color ?? '#94A3B8';
}