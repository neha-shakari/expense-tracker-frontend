const CATEGORIES = [
  'ALL', 'FOOD', 'TRAVEL', 'BILLS',
  'ENTERTAINMENT', 'HEALTH', 'SHOPPING', 'OTHER'
];

const MONTHS = [
  { value: '', label: 'All Months' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

function FilterBar({ filters, onFilterChange, onClearFilters }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex gap-4 items-end flex-wrap">
      <div>
        <label className="block text-gray-700 font-medium mb-1 text-sm">
          Category
        </label>
        <select
          value={filters.category}
          onChange={e => onFilterChange('category', e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat === 'ALL' ? '' : cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1 text-sm">
          Month
        </label>
        <select
          value={filters.month}
          onChange={e => onFilterChange('month', e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
          {MONTHS.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1 text-sm">
          Year
        </label>
        <select
          value={filters.year}
          onChange={e => onFilterChange('year', e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
          <option value="">All Years</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      <button
        onClick={onClearFilters}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
        🔄 Clear Filters
      </button>
    </div>
  );
}

export default FilterBar;