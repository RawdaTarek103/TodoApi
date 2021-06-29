const express = require('express')
const { createTask, deleteTask, readAllTasks, updateTask } = require('../controllers/taskController')
const taskRouter = express.Router()

taskRouter.post("/", createTask)
taskRouter.delete("/:id", deleteTask)
taskRouter.get("/", readAllTasks)
taskRouter.patch("/:id", updateTask)

module.exports = taskRouter