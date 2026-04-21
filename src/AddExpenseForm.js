import { useState } from 'react';
import useApi from './useApi';

function AddExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { apiCall } = useApi();

  const handleSubmit = () => {
    if (!title || !amount) {
      setError('Please fill in all fields!');
      return;
    }

    setLoading(true);
    setError('');

    apiCall('/expenses', {
      method: 'POST',
      body: JSON.stringify({
        title,
        amount: parseFloat(amount),
        category
      })
    })
      .then(res => res.json())
      .then(newExpense => {
        onExpenseAdded(newExpense);
        setTitle('');
        setAmount('');
        setCategory('FOOD');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to add expense!');
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        ➕ Add New Expense
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value="FOOD">🍕 Food</option>
            <option value="TRAVEL">✈️ Travel</option>
            <option value="BILLS">💡 Bills</option>
            <option value="ENTERTAINMENT">🎬 Entertainment</option>
            <option value="HEALTH">🏥 Health</option>
            <option value="SHOPPING">🛍️ Shopping</option>
            <option value="OTHER">📦 Other</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50">
        {loading ? 'Adding...' : '➕ Add Expense'}
      </button>
    </div>
  );
}

export default AddExpenseForm;