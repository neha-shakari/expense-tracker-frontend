import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = {
  FOOD: '#22c55e',
  TRAVEL: '#3b82f6',
  BILLS: '#ef4444',
  ENTERTAINMENT: '#a855f7',
  HEALTH: '#eab308',
  SHOPPING: '#ec4899',
  OTHER: '#6b7280'
};

function SpendingPieChart({ byCategory }) {

  const data = Object.entries(byCategory).map(([name, value]) => ({
    name,
    value
  }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No data yet! Add some expenses 😊
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={COLORS[entry.name] || '#6b7280'}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`₹${value}`, 'Amount']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SpendingPieChart;