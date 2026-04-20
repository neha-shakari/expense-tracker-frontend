import { useState, useEffect } from 'react';
import ExpenseItem from '../ExpenseItem';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/expenses", {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZWhhIiwiaWF0IjoxNzc2NjgzOTE5LCJleHAiOjE3NzY3MTk5MTl9.a5gkZ2KrfLJPNwxlGCseM-3yxsxhUwgEwCEHmy34mB0"
      }
    })
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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