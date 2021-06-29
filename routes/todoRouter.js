const express = require('express')
const { createTodo, readTodoByTitle, deleteTodo, readAllTodos, updateTodo } = require('../controllers/todoController')
const todoRouter = express.Router()

todoRouter.post("/", createTodo)
todoRouter.get("/:title", readTodoByTitle)
todoRouter.delete("/:id", deleteTodo)
todoRouter.get("/", readAllTodos)
todoRouter.patch("/:id", updateTodo)

module.exports = todoRouter