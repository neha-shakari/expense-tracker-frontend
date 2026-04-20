function LoginPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🔐 Login</h1>
      <p>Login to your expense tracker</p>
      <input
        type="text"
        placeholder="Username"
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />
      <button style={{ padding: "8px 20px" }}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;