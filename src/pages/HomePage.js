import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-4">
          💰 Expense Tracker
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-lg mx-auto">
          Track your spending, set budgets and understand
          your finances with beautiful charts and insights!
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <Link to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition text-lg">
            Get Started Free ✨
          </Link>
          <Link to="/login"
            className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition text-lg">
            Login 🔐
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white bg-opacity-20 rounded-xl p-6">
            <p className="text-3xl mb-2">📊</p>
            <h3 className="font-bold mb-1">Analytics</h3>
            <p className="text-blue-100 text-sm">
              Beautiful charts and spending insights
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-6">
            <p className="text-3xl mb-2">💡</p>
            <h3 className="font-bold mb-1">Budgets</h3>
            <p className="text-blue-100 text-sm">
              Set limits and track your spending
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-6">
            <p className="text-3xl mb-2">🔐</p>
            <h3 className="font-bold mb-1">Secure</h3>
            <p className="text-blue-100 text-sm">
              JWT authentication keeps data safe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;