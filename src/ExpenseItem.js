import { useState } from 'react';
import useApi from './useApi';

function ExpenseItem({ expense, onDeleted, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [loading, setLoading] = useState(false);

  const { apiCall } = useApi();

  const categoryColors = {
    FOOD: "bg-green-100 text-green-700",
    TRAVEL: "bg-blue-100 text-blue-700",
    BILLS: "bg-red-100 text-red-700",
    ENTERTAINMENT: "bg-purple-100 text-purple-700",
    HEALTH: "bg-yellow-100 text-yellow-700",
    SHOPPING: "bg-pink-100 text-pink-700",
    OTHER: "bg-gray-100 text-gray-700",
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this expense?')) return;

    setLoading(true);
    apiCall(`/expenses/${expense.id}`, { method: 'DELETE' })
      .then(() => onDeleted(expense.id))
      .catch(() => setLoading(false));
  };

  const handleUpdate = () => {
    setLoading(true);
    apiCall(`/expenses/${expense.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, amount: parseFloat(amount), category })
    })
      .then(res => res.json())
      .then(updated => {
        onUpdated(updated);
        setIsEditing(false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-3">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
            <option value="FOOD">🍕 Food</option>
            <option value="TRAVEL">✈️ Travel</option>
            <option value="BILLS">💡 Bills</option>
            <option value="ENTERTAINMENT">🎬 Entertainment</option>
            <option value="HEALTH">🏥 Health</option>
            <option value="SHOPPING">🛍️ Shopping</option>
            <option value="OTHER">📦 Other</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50">
            {loading ? 'Saving...' : '✅ Save'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-3 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">{expense.title}</h3>
        <div className="flex gap-2 mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[expense.category]}`}>
            {expense.category}
          </span>
          {expense.date && (
            <span className="text-xs text-gray-400 py-1">
              {expense.date}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xl font-bold text-gray-800">
          ₹{expense.amount}
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;