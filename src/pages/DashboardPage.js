function DashboardPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Dashboard
      </h1>
      <p className="text-gray-600 mb-6">Welcome back, Neha!</p>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total This Month</p>
          <h2 className="text-3xl font-bold text-blue-600">₹5,000</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Highest Category</p>
          <h2 className="text-3xl font-bold text-green-600">FOOD</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <h2 className="text-3xl font-bold text-purple-600">12</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-500">
          Connect to your backend to see real data!
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;