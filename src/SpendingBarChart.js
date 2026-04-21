import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

function SpendingBarChart({ summary }) {

  const data = [
    {
      name: 'Last Month',
      amount: summary?.totalLastMonth || 0
    },
    {
      name: 'This Month',
      amount: summary?.totalThisMonth || 0
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip
          formatter={(value) => [`₹${value}`, 'Amount']}
        />
        <Legend />
        <Bar
          dataKey="amount"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          name="Total Spent"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpendingBarChart;