const taskModel = require('../models/task')
const todoModel = require('../models/todo')

// todoId:
// title: 
// description
// done: 

const createTask = async (req, res, next) => {
    const task = new taskModel(req.body);
    try {
        const todo = todoModel.findOne({ _id: req.params.id })
        if(JSON.stringify(todo) === "{}"){
            res.statusCode = 404
            res.send({"msg":"creation failed, todo list was not found"})
        }
        task.todoId = req.params.todoId;
        const doc = await task.save()
        res.statusCode = 201
        res.send(doc)
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const readAllTasks = async (req, res, next) => {
    try {
        const tasks = await todoModel.find({ todoId: req.params.todoId }).exec()
        res.statusCode = 200
        res.send(tasks)
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id
    try {
        const result = await taskModel.deleteOne({ _id: taskId }).exec()
        if (result.deletedCount == 0) {
            res.statusCode = 404
            res.send({ msg: "task was not found" })
        } else {
            res.statusCode = 200
            res.send({ msg: "task was deleted successfully" })
        }
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const updateTask = async (req, res, next) => {
    const taskId = req.params.id
    try {
        const task = await taskModel.findOne({ _id: taskId }).exec()
        if (JSON.stringify(task) === '{}') {
            res.statusCode = 404
            res.send({ msg: "task was not found" })
        }
        else {
            task.done = req.body.done
            const newTask = await task.save()
            res.statusCode = 200
            res.send(newTask)
        }

    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

/*
create task
read task
update task
delete task
*/
module.exports = { createTask, deleteTask, readAllTasks, updateTask }