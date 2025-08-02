const express = require('express');
const { Todo } = require('../db/database');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all todos for user
router.get('/', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).select('text');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Create a new todo
router.post('/', authenticate, async (req, res) => {
  const { text } = req.body;

  try {
    const todo = new Todo({ user: req.user.id, text });
    await todo.save();
    res.json({ id: todo._id, text: todo.text });
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// Update a todo
router.put('/:id', authenticate, async (req, res) => {
  const { text } = req.body;

  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { text },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    res.json({ id: updated._id, text: updated.text });
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Delete a todo
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

module.exports = router;