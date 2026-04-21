import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import useApi from '../useApi';
import LoadingSpinner from '../LoadingSpinner';

const CATEGORIES = [
  'FOOD', 'TRAVEL', 'BILLS',
  'ENTERTAINMENT', 'HEALTH', 'SHOPPING', 'OTHER'
];

function BudgetPage() {
  const [budgetStatus, setBudgetStatus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('FOOD');
  const [limitAmount, setLimitAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const { token } = useAuth();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchBudgets();
  }, [token]);

  const fetchBudgets = () => {
    apiCall('/budget/status')
      .then(res => res.json())
      .then(data => {
        setBudgetStatus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleSetBudget = () => {
    if (!limitAmount) {
      setMessage('Please enter a budget amount!');
      return;
    }

    setSaving(true);
    setMessage('');

    apiCall('/budget/set', {
      method: 'POST',
      body: JSON.stringify({
        category: selectedCategory,
        limitAmount: parseFloat(limitAmount)
      })
    })
      .then(res => res.json())
      .then(() => {
        setMessage(`✅ Budget set for ${selectedCategory}!`);
        setLimitAmount('');
        setSaving(false);
        fetchBudgets();
      })
      .catch(() => {
        setMessage('❌ Failed to set budget');
        setSaving(false);
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        💡 Budget Manager
      </h1>
      <p className="text-gray-500 mb-6">
        Set and track your spending limits
      </p>

      {/* Set Budget Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          ➕ Set Budget Limit
        </h2>

        {message && (
          <div className={`px-4 py-2 rounded-lg mb-4 ${
            message.includes('✅')
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Monthly Limit (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 3000"
              value={limitAmount}
              onChange={e => setLimitAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSetBudget}
              disabled={saving}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50">
              {saving ? 'Saving...' : '💾 Set Budget'}
            </button>
          </div>
        </div>
      </div>

      {/* Budget Status */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📊 Budget Status
        </h2>

        {budgetStatus.length === 0 ? (
          <p className="text-gray-500">
            No budgets set yet! Set one above 😊
          </p>
        ) : (
          budgetStatus.map(budget => {
            const percentage = Math.min(
              (budget.spent / budget.limit) * 100,
              100
            ).toFixed(0);

            return (
              <div key={budget.category} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold text-gray-800">
                      {budget.category}
                    </span>
                    <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
                      budget.exceeded
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {budget.status}
                    </span>
                  </div>
                  <span className="text-gray-600 text-sm">
                    ₹{budget.spent} / ₹{budget.limit}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      budget.exceeded
                        ? 'bg-red-500'
                        : percentage > 75
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span>
                  <span>
                    {budget.exceeded
                      ? `₹${budget.remaining} over budget!`
                      : `₹${budget.remaining} remaining`}
                  </span>
                  <span>₹{budget.limit}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BudgetPage;