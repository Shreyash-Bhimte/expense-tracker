// Line chart showing daily spending trend for the selected month.
// Days with no spending render as zero — giving a complete picture
// of the full month rather than just days with transactions.

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Dot
} from 'recharts';
import { getDailyBreakdown } from '../lib/expenseUtils';
import styles from './DailyLineChart.module.css';

// Custom tooltip shown on point hover
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '10px 14px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Day {label}</p>
      <p style={{ fontWeight: 700, color: '#4F6EF7' }}>
        ₹{Number(payload[0].value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

function DailyLineChart({ expenses, selectedMonth }) {
  const data     = getDailyBreakdown(expenses, selectedMonth);
  const hasSpend = data.some(d => d.total > 0);

  return (
    <div className={styles.card}>
      <p className={styles.title}>Daily Spending Trend</p>

      {!hasSpend ? (
        <p className={styles.empty}>No data for this month</p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#888' }}
              axisLine={false}
              tickLine={false}
              // Show every 5th day label to avoid crowding
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#888' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#4F6EF7"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#4F6EF7' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default DailyLineChart;