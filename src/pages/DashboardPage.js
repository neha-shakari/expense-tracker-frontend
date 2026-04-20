import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import useApi from '../useApi';
import ExpenseItem from '../ExpenseItem';

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [byCategory, setByCategory] = useState({});
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // fetch all data in parallel
    Promise.all([
      apiCall('/analytics/summary').then(res => res.json()),
      apiCall('/analytics/by-category').then(res => res.json()),
      apiCall('/expenses').then(res => res.json())
    ])
      .then(([summaryData, categoryData, expensesData]) => {
        setSummary(summaryData);
        setByCategory(categoryData);
        setRecentExpenses(expensesData.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-2xl text-gray-500">Loading... ⏳</h2>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        📊 Dashboard
      </h1>
      <p className="text-gray-500 mb-6">
        Here's your spending overview!
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm mb-1">Total This Month</p>
          <h2 className="text-3xl font-bold text-blue-600">
            ₹{summary?.totalThisMonth || 0}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            vs last month: {summary?.changeVsLastMonth || 'N/A'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm mb-1">Highest Category</p>
          <h2 className="text-3xl font-bold text-green-600">
            {Object.keys(byCategory).length > 0
              ? Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0][0]
              : 'N/A'}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm mb-1">Total Expenses</p>
          <h2 className="text-3xl font-bold text-purple-600">
            {summary?.totalExpenses || 0}
          </h2>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          💰 Spending by Category
        </h2>
        {Object.keys(byCategory).length === 0 ? (
          <p className="text-gray-500">No data yet!</p>
        ) : (
          Object.entries(byCategory).map(([category, amount]) => (
            <div key={category}
              className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="text-gray-700 font-medium">{category}</span>
              <span className="text-gray-800 font-bold">₹{amount}</span>
            </div>
          ))
        )}
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🕐 Recent Expenses
        </h2>
        {recentExpenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet!</p>
        ) : (
          recentExpenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              category={expense.category}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPage;