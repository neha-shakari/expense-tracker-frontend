function ExpenseItem({ title, amount, category }) {
  const categoryColors = {
    FOOD: "bg-green-100 text-green-700",
    TRAVEL: "bg-blue-100 text-blue-700",
    BILLS: "bg-red-100 text-red-700",
    ENTERTAINMENT: "bg-purple-100 text-purple-700",
    HEALTH: "bg-yellow-100 text-yellow-700",
    SHOPPING: "bg-pink-100 text-pink-700",
    OTHER: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-3 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[category]}`}>
          {category}
        </span>
      </div>
      <p className="text-xl font-bold text-gray-800">₹{amount}</p>
    </div>
  );
}

export default ExpenseItem;