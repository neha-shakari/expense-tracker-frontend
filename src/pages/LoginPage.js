function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back! 👋
        </h1>
        <p className="text-gray-500 mb-6">
          Login to your expense tracker
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;