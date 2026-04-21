import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import useApi from '../useApi';
import ExpenseItem from '../ExpenseItem';
import AddExpenseForm from '../AddExpenseForm';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    apiCall('/expenses')
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-2xl text-gray-500">Loading... ⏳</h2>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        💰 My Expenses
      </h1>

      <AddExpenseForm onExpenseAdded={handleExpenseAdded} />

      <div className="max-w-2xl">
        <p className="text-gray-500 mb-4">
          Total: {expenses.length} expenses
        </p>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet! Add some above 😊</p>
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
    </div>
  );
}

export default ExpensesPage;