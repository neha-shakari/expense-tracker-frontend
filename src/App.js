import ExpenseItem from './ExpenseItem';
import Counter from './Counter';

function App() {
  return (
    <div>
      <h1>💰 Expense Tracker</h1>
      <p>Welcome to your personal expense tracker!</p>

      <Counter />

      <ExpenseItem
        title="Groceries"
        amount={500}
        category="FOOD"
      />
      <ExpenseItem
        title="Uber"
        amount={200}
        category="TRAVEL"
      />
      <ExpenseItem
        title="Electricity"
        amount={1500}
        category="BILLS"
      />
    </div>
  );
}

export default App;
