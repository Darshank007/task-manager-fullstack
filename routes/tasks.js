import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for the authenticated user
 * @access  Private
 * @query   search - Search tasks by title
 * @query   status - Filter by status (pending, in-progress, completed)
 */
router.get('/', async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const userId = req.user._id;

    // Build query
    const query = { user: userId };

    // Add search filter (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Add status filter
    if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
      query.status = status;
    }

    // Fetch tasks sorted by createdAt (newest first)
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task by ID
 * @access  Private
 */
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id, // Ensure task belongs to user
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post('/', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        message: 'Title is required',
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'pending',
      user: req.user._id,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Find task and ensure it belongs to user
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      if (['pending', 'in-progress', 'completed'].includes(status)) {
        task.status = status;
      } else {
        return res.status(400).json({
          message: 'Invalid status. Must be: pending, in-progress, or completed',
        });
      }
    }

    await task.save();

    res.json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // Ensure task belongs to user
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

