import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/tasks - Retrieve all tasks with optional filters
router.get('/', (req, res) => {
  try {
    const { category, status, priority, search, sortBy } = req.query;
    const tasks = db.getTasks({ category, status, priority, search, sortBy });
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tasks',
      error: error.message
    });
  }
});

// GET /api/tasks/:id - Retrieve single task
router.get('/:id', (req, res) => {
  try {
    const task = db.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${req.params.id}' not found`
      });
    }
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve task',
      error: error.message
    });
  }
});

// POST /api/tasks - Create a new task
router.post('/', (req, res) => {
  try {
    const { title, description, priority, category, dueDate, completed } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    const newTask = db.createTask({
      title,
      description,
      priority,
      category,
      dueDate,
      completed
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Full update of a task
router.put('/:id', (req, res) => {
  try {
    const { title, description, priority, category, dueDate, completed } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    const updated = db.updateTask(req.params.id, {
      title,
      description,
      priority,
      category,
      dueDate,
      completed
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${req.params.id}' not found`
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
});

// PATCH /api/tasks/:id - Partial update (e.g. toggle complete, change priority)
router.patch('/:id', (req, res) => {
  try {
    const updated = db.updateTask(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${req.params.id}' not found`
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteTask(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${req.params.id}' not found`
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message
    });
  }
});

// POST /api/tasks/clear-completed - Clear all completed tasks
router.post('/clear-completed', (req, res) => {
  try {
    const removedCount = db.clearCompletedTasks();
    res.json({
      success: true,
      message: `Cleared ${removedCount} completed tasks`,
      removedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear completed tasks',
      error: error.message
    });
  }
});

// POST /api/tasks/reset - Reset to default demo tasks
router.post('/reset', (req, res) => {
  try {
    const tasks = db.resetTasks();
    res.json({
      success: true,
      message: 'Tasks reset to initial demo dataset',
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reset tasks',
      error: error.message
    });
  }
});

export default router;
