import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BudgetPage from './pages/BudgetPage';

function AppContent() {
  const location = useLocation();
  const hideNavbar = ['/', '/login', '/register']
    .includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;