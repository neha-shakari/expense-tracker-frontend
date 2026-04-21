import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import useApi from '../useApi';
import SpendingPieChart from '../SpendingPieChart';
import SpendingBarChart from '../SpendingBarChart';

function AnalyticsPage() {
  const [summary, setSummary] = useState(null);
  const [byCategory, setByCategory] = useState({});
  const [highestCategory, setHighestCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    Promise.all([
      apiCall('/analytics/summary').then(res => res.json()),
      apiCall('/analytics/by-category').then(res => res.json()),
      apiCall('/analytics/highest-category').then(res => res.json())
    ])
      .then(([summaryData, categoryData, highestData]) => {
        setSummary(summaryData);
        setByCategory(categoryData);
        setHighestCategory(highestData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-2xl text-gray-500">Loading... ⏳</h2>
    </div>
  );

  const totalSpent = summary?.totalThisMonth || 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        📈 Analytics
      </h1>
      <p className="text-gray-500 mb-6">
        Your spending insights for this month
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm mb-1">Total This Month</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₹{totalSpent}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm mb-1">Total Last Month</p>
          <h2 className="text-2xl font-bold text-gray-600">
            ₹{summary?.totalLastMonth || 0}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm mb-1">Change vs Last Month</p>
          <h2 className="text-2xl font-bold text-green-600">
            {summary?.changeVsLastMonth || 'N/A'}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm mb-1">Highest Category</p>
          <h2 className="text-2xl font-bold text-purple-600">
            {highestCategory?.highestCategory || 'N/A'}
          </h2>
          <p className="text-gray-400 text-xs">
            ₹{highestCategory?.amount || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            🍕 Spending by Category
          </h2>
          <SpendingPieChart byCategory={byCategory} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📊 This Month vs Last Month
          </h2>
          <SpendingBarChart summary={summary} />
        </div>
      </div>

      {/* Category Breakdown with percentage bars */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          💰 Category Breakdown
        </h2>
        {Object.keys(byCategory).length === 0 ? (
          <p className="text-gray-500">No data yet!</p>
        ) : (
          Object.entries(byCategory)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => {
              const percentage = totalSpent > 0
                ? ((amount / totalSpent) * 100).toFixed(1)
                : 0;

              return (
                <div key={category} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">
                      {category}
                    </span>
                    <span className="text-gray-800 font-bold">
                      ₹{amount} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;