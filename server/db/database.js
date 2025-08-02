// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kamalakar1625:mLGLdjUVs4oO6OR2@cluster0.gxwuk.mongodb.net/todo-app?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

// Todo schema
const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = { User, Todo };