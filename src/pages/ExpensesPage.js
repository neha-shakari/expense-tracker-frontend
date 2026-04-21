import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import useApi from '../useApi';
import ExpenseItem from '../ExpenseItem';
import AddExpenseForm from '../AddExpenseForm';
import FilterBar from '../FilterBar';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    month: '',
    year: ''
  });

  const { token } = useAuth();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchExpenses();
  }, [token, filters]);

  const fetchExpenses = () => {
    setLoading(true);

    // build query string based on filters
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.month) params.append('month', filters.month);
    if (filters.year) params.append('year', filters.year);

    const queryString = params.toString();
    const url = queryString
      ? `/expenses?${queryString}`
      : '/expenses';

    apiCall(url)
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ category: '', month: '', year: '' });
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleExpenseDeleted = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleExpenseUpdated = (updatedExpense) => {
    setExpenses(expenses.map(e =>
      e.id === updatedExpense.id ? updatedExpense : e
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        💰 My Expenses
      </h1>

      <AddExpenseForm onExpenseAdded={handleExpenseAdded} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <h2 className="text-2xl text-gray-500">Loading... ⏳</h2>
        </div>
      ) : (
        <div className="max-w-2xl">
          <p className="text-gray-500 mb-4">
            Showing {expenses.length} expenses
            {filters.category && ` in ${filters.category}`}
            {filters.month && ` for month ${filters.month}`}
            {filters.year && ` of ${filters.year}`}
          </p>

          {expenses.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <p className="text-gray-400 text-lg">
                No expenses found! 😊
              </p>
              {(filters.category || filters.month || filters.year) && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-blue-500 hover:underline">
                  Clear filters to see all expenses
                </button>
              )}
            </div>
          ) : (
            expenses.map(expense => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDeleted={handleExpenseDeleted}
                onUpdated={handleExpenseUpdated}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ExpensesPage;