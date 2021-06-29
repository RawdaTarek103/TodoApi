const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    todoId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description:{
        type: String,
        required: true,
        maxLength: 400
    },
    done: {
        type: Boolean,
        default: false
    }
})

const taskModel = mongoose.model("tasks", taskSchema)

module.exports = taskModel