const TaskFilters = ({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search by Title
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="Search tasks..."
          />
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(search || statusFilter) && (
        <button
          onClick={() => {
            onSearchChange('');
            onStatusFilterChange('');
          }}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default TaskFilters;

