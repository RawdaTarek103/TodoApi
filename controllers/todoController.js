const todoModel = require('../models/todo')

// userId:
// title: 
// dueDate:
// createdAt:
// done: 

const createTodo = async (req, res, next) => {
    const todo = new todoModel(req.body);
    try {
        todo.createdAt = Date.now()
        todo.userId = req.userId;
        const doc = await todo.save()
        res.statusCode = 201
        res.send({ access_token: req.accessToken, todo: doc })
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const readTodoByTitle = async (req, res, next) => {
    const title = req.params.title
    try {
        const todos = await todoModel.find({ userId: req.userId, title: { $regex: '.*' + title + '.*' } }, { userId: 0 }).exec()
        res.statusCode = 200
        res.send({ access_token: req.accessToken, user_id: req.userId, todo_lists: todos })
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const readAllTodos = async (req, res, next) => {
    try {
        const todos = await todoModel.find({ userId: req.userId }, { userId: 0 }).exec()
        res.statusCode = 200
        res.send({ access_token: req.accessToken, user_id: req.userId, todo_lists: todos })
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const deleteTodo = async (req, res, next) => {
    const todoId = req.params.id
    try {
        const result = await todoModel.deleteOne({ userId: req.userId, _id: todoId }).exec()
        if (result.deletedCount == 0) {
            res.statusCode = 404
            res.send({ msg: "todo list was not found" })
        } else {
            res.statusCode = 200
            res.send({ access_token: req.accessToken, msg: "todo list was deleted successfully" })
        }
    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

const updateTodo = async (req, res, next) => {
    const todoId = req.params.id
    try {
        const todo = await todoModel.findOne({ userId: req.userId, _id: todoId }).exec()
        if (JSON.stringify(todo) === '{}') {
            res.statusCode = 404
            res.send({ msg: "todo list was not found" })
        }
        else {
            todo.done = req.body.done
            const {userId, ...newTodo} = await todo.save()
            res.statusCode = 200
            res.send({ access_token: req.accessToken, new_todo: newTodo })
        }

    } catch (e) {
        res.statusCode = 400
        res.send(e)
    }
}

/*
create todo
read todo
update todo
delete todo
*/
module.exports = { createTodo, readTodoByTitle, deleteTodo, readAllTodos, updateTodo }