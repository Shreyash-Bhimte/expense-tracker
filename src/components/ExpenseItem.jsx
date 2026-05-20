// Renders a single expense row in view or edit mode.
// Edit mode shows an inline form pre-filled with current values.
// Owns its own editing UI state; data changes bubble up via onUpdate/onDelete.

import { useState } from 'react';
import { getCategoryColor, CATEGORIES } from '../lib/categories';
import styles from './ExpenseItem.module.css';

function ExpenseItem({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Draft state — pre-filled with current expense values when edit opens
  const [draft, setDraft] = useState({
    amount:   expense.amount,
    category: expense.category,
    date:     expense.date,
    note:     expense.note || '',
  });

  const color = getCategoryColor(expense.category);

  const formattedDate = new Date(expense.date + 'T00:00:00')
    .toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  function handleEditOpen() {
    // Reset draft to current saved values each time edit opens
    setDraft({
      amount:   expense.amount,
      category: expense.category,
      date:     expense.date,
      note:     expense.note || '',
    });
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  async function handleSave() {
    const parsedAmount = parseFloat(draft.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    setSaving(true);
    try {
      await onUpdate(expense.id, {
        amount:   parsedAmount,
        category: draft.category,
        date:     draft.date,
        note:     draft.note.trim() || null,
      });
      setIsEditing(false);
    } catch (err) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    if (window.confirm(`Delete this ${expense.category} expense of ₹${expense.amount}?`)) {
      onDelete(expense.id);
    }
  }

  // ── Edit mode ────────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className={styles.item}>
        <div className={styles.editForm}>
          <div className={styles.editRow}>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className={`${styles.editInput} ${styles.amount}`}
              value={draft.amount}
              onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
              placeholder="Amount"
            />

            <select
              className={styles.editSelect}
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <input
              type="date"
              className={`${styles.editInput} ${styles.date}`}
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
            />
          </div>

          <div className={styles.editRow}>
            <input
              type="text"
              className={`${styles.editInput} ${styles.note}`}
              value={draft.note}
              onChange={(e) => setDraft({ ...draft, note: e.target.value })}
              placeholder="Note (optional)"
            />
          </div>

          <div className={styles.editActions}>
            <button
              className={styles.saveButton}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              className={styles.cancelEditButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── View mode ─────────────────────────────────────────────────────────────────
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
            className={styles.editButton}
            onClick={handleEditOpen}
            aria-label="Edit expense"
          >
            ✎
          </button>
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