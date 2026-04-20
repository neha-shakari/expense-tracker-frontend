import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#1a1a2e",
      padding: "15px 20px",
      display: "flex",
      gap: "20px"
    }}>
      <Link to="/dashboard"
        style={{ color: "white", textDecoration: "none" }}>
        📊 Dashboard
      </Link>
      <Link to="/expenses"
        style={{ color: "white", textDecoration: "none" }}>
        💰 Expenses
      </Link>
      <Link to="/login"
        style={{ color: "white", textDecoration: "none" }}>
        🔐 Login
      </Link>
    </nav>
  );
}

export default Navbar;