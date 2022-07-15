const express = require("express");
const { createTodo,getTodos,getTodo,deleteTodo,updateTodo } = require('../controllers/todoControllers')

const router = express.Router();

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

module.exports = router;
