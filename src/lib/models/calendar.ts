import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    calendars: [
        {
            month: {
                type: Number,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            events: [
                {
                    title: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                    },
                    date: {
                        type: Date,
                        required: true
                    },
                    isImportant: {
                        type: Boolean,
                        required: true
                    }

                }

            ]
        }
    ]
})

export default mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema);