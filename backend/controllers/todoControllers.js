const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

const getTodos = async(req,res) => {
    const todos = await Todo.find()
    res.status(200).json(todos)
}

const getTodo = async(req,res) => {
    const { id } = req.params

    const todo = await Todo.findById(id)
    res.status(200).json(todo)

}

const createTodo = async(req,res) => {
    const { text } = req.body

  try{
    const todo = await Todo.create({text})
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteTodo = async(req,res) => {
    const { id } = req.params

    const todo = await Todo.findByIdAndDelete({_id: id})
    res.status(200).json(todo)
}

const updateTodo = async(req,res) => {
    const { id } =req.params

    const todo = await Todo.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    res.status(200).json(todo)
}




module.exports = { createTodo,getTodos,getTodo,deleteTodo,updateTodo }