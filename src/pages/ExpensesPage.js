import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ExpenseItem from '../ExpenseItem';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8080/expenses', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        💰 My Expenses
      </h1>
      <p className="text-gray-500 mb-4">
        Total: {expenses.length} expenses
      </p>
      <div className="max-w-2xl">
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet! Add some 😊</p>
        ) : (
          expenses.map(expense => (
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

export default ExpensesPage;