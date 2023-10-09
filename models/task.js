const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true},
    completed: { type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now()}
}, {versionKey: false});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;