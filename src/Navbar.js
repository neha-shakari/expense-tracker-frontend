import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex gap-6 items-center shadow-lg">
      <h1 className="text-white font-bold text-xl mr-auto">
        💰 Expense Tracker
      </h1>
      {token ? (
        <>
          <Link to="/dashboard"
            className="text-gray-300 hover:text-white transition">
            📊 Dashboard
          </Link>
          <Link to="/expenses"
            className="text-gray-300 hover:text-white transition">
            💰 Expenses
          </Link>
          <Link to="/analytics"
            className="text-gray-300 hover:text-white transition">
            📈 Analytics
          </Link>
          <Link to="/budget"
            className="text-gray-300 hover:text-white transition">
            💡 Budget
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </>
      ) : (
        <Link to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          🔐 Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;