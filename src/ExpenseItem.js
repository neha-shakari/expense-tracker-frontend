function ExpenseItem(props) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{props.title}</h3>
      <p>Amount: ₹{props.amount}</p>
      <p>Category: {props.category}</p>
    </div>
  );
}

export default ExpenseItem;