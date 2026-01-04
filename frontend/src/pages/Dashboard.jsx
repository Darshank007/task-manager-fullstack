import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskAPI.getAll(search, statusFilter);
      setTasks(data.tasks || []);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to fetch tasks. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.create(taskData);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create task. Please try again.'
      );
    }
  };

  // Handle task update
  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskAPI.update(id, taskData);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update task. Please try again.'
      );
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.delete(id);
      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to delete task. Please try again.'
      );
    }
  };

  // Handle edit click
  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
              <p className="text-sm text-gray-600">
                Welcome, {user?.name || 'User'}
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <TaskFilters
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Add Task Button */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium shadow-md"
            >
              + Add New Task
            </button>
          </div>
        )}

        {/* Task Form */}
        {showForm && (
          <div className="mb-6">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleFormCancel}
            />
          </div>
        )}

        {/* Task List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading tasks...</div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">
              {search || statusFilter
                ? 'No tasks found matching your filters.'
                : 'No tasks yet. Create your first task!'}
            </p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

