function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center bg-white rounded-xl shadow p-8">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-500 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;