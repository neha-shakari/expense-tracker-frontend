import { useState, useEffect } from 'react';
import ExpenseItem from '../ExpenseItem';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/expenses", {
      headers: {
        "Authorization": "Bearer YOUR_TOKEN_HERE"
      }
    })
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading... ⏳</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>💰 My Expenses</h1>
      <p>Total: {expenses.length} expenses</p>
      {expenses.map(expense => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          category={expense.category}
        />
      ))}
    </div>
  );
}

export default ExpensesPage;