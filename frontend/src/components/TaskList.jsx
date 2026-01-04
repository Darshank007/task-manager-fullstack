import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;

