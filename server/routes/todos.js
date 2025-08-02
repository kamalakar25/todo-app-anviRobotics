const express = require('express');
const db = require('../db/database');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  db.all(`SELECT id, text FROM todos WHERE user_id = ?`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error fetching todos' });
    res.json(rows);
  });
});

router.post('/', authenticate, (req, res) => {
  const { text } = req.body;
  db.run(`INSERT INTO todos (user_id, text) VALUES (?, ?)`, [req.user.id, text], function (err) {
    if (err) return res.status(500).json({ message: 'Error creating todo' });
    res.json({ id: this.lastID, text });
  });
});

router.put('/:id', authenticate, (req, res) => {
  const { text } = req.body;
  db.run(`UPDATE todos SET text = ? WHERE id = ? AND user_id = ?`, [text, req.params.id, req.user.id], function (err) {
    if (err || this.changes === 0) return res.status(404).json({ message: 'Todo not found' });
    res.json({ id: req.params.id, text });
  });
});

router.delete('/:id', authenticate, (req, res) => {
  db.run(`DELETE FROM todos WHERE id = ? AND user_id = ?`, [req.params.id, req.user.id], function (err) {
    if (err || this.changes === 0) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  });
});

module.exports = router;