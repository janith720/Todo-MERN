const express = require("express");
const Todo = require('../models/todoModel')

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "get all todos" });
});

router.get("/:id", (req, res) => {
  res.json({ msg: "get single todo" });
});

router.post("/", async (req, res) => {
  const { text } = req.body

  try{
    const todo = await Todo.create({text})
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  //res.json({ msg: "add a new todo" });
});

router.delete("/:id", (req, res) => {
  res.json({ msg: "delete a new todo" });
});

router.patch("/:id", (req, res) => {
  res.json({ msg: "update a todo" });
});

module.exports = router;
