function DashboardPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>
      <p>Welcome back, Neha!</p>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "8px" }}>
          <h3>Total This Month</h3>
          <h2>₹5000</h2>
        </div>
        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "8px" }}>
          <h3>Highest Category</h3>
          <h2>FOOD</h2>
        </div>
        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Expenses</h3>
          <h2>12</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;