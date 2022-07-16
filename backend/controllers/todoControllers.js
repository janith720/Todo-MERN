const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { text } = req.body;

  try {
    const todo = await Todo.create({ text });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  //check the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No todos" });
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json({ error: "no todos" });
  }
  res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No todos" });
  }

  const todo = await Todo.findByIdAndUpdate({ _id: id }, { text: text });
  res.status(200).json(todo);

  if (!todo) {
    return res.status(400).json({ error: "no todos items" });
  }
};

module.exports = { createTodo, getTodos, getTodo, deleteTodo, updateTodo };
