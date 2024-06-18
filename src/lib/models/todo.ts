import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
    },
    items: [
        {
            content: {
                type: String,
                required: true
            },
            isDone: {
                type: Boolean,
                required: true
            }
        }
    ]

})

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);