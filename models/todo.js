const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    dueDate: Date,
    createdAt: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

const todoModel = mongoose.model("todos", todoSchema)

module.exports = todoModel