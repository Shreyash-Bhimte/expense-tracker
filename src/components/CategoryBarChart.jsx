// Bar chart showing total spending per category for the selected month.
// Data is pre-computed by the parent — this component only renders.

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { getCategoryBreakdown } from '../lib/expenseUtils';
import styles from './CategoryBarChart.module.css';

// Custom tooltip shown on bar hover
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { category, total, color } = payload[0].payload;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '10px 14px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>{category}</p>
      <p style={{ fontWeight: 700, color }}>
        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

function CategoryBarChart({ expenses }) {
  const data = getCategoryBreakdown(expenses);

  return (
    <div className={styles.card}>
      <p className={styles.title}>Spending by Category</p>

      {data.length === 0 ? (
        <p className={styles.empty}>No data for this month</p>
      ) : (
        <div className={styles.chartWrapper}>
          {/* ResponsiveContainer makes the chart fill its parent width */}
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#888' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#888' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f5f5' }} />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {/* Each bar gets its category color */}
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CategoryBarChart;