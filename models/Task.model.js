const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ["to-do", "doing", "done" ]
    },
    due_date: {
        type: Date,
        required: true,
        min: '01-01-2024',
        max: '01-01-3024'
    },
    label: {
        type: String
    }

    
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;