import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex gap-6 items-center shadow-lg">
      <h1 className="text-white font-bold text-xl mr-auto">
        💰 Expense Tracker
      </h1>
      <Link to="/dashboard"
        className="text-gray-300 hover:text-white transition">
        📊 Dashboard
      </Link>
      <Link to="/expenses"
        className="text-gray-300 hover:text-white transition">
        💰 Expenses
      </Link>
      <Link to="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        🔐 Login
      </Link>
    </nav>
  );
}

export default Navbar;