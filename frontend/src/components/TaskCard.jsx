const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          {task.title}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            task.status
          )}`}
        >
          {task.status.replace('-', ' ')}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="text-xs text-gray-500 mb-4">
        Created: {formatDate(task.createdAt)}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

