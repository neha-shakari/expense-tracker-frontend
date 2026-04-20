import { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/expenses", {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZWhhIiwiaWF0IjoxNzc2NjgyMzA4LCJleHAiOjE3NzY3MTgzMDh9.VhQc6UGCcOdn-4asCFz9K1wn8NemAgXXqa18EYpMlP4"
      }
    })
      .then(response => response.json())
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch expenses");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading expenses... ⏳</h2>;
  if (error) return <h2>{error} ❌</h2>;

  return (
    <div>
      <h1>💰 Expense Tracker</h1>
      <p>Total expenses: {expenses.length}</p>

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

export default App;