import mongoose from 'mongoose';

const notebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    notes: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Notebook || mongoose.model("Notebook", notebookSchema);