import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
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
            points: [
                {
                    content: {
                        type: String,
                        required: true
                    },
                    isDone: {
                        type: Boolean,
                        default: false
                    },
                    isImportant: {
                        type: Boolean,
                        default: false
                    }
                }
            ],
            content: {
                type: String,
                required: true
            },
            isDone: {
                type: Boolean,
                default: false
            },
            isImportant: {
                type: Boolean,
                default: false
            }
        }
    ]

})

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);