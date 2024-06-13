import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type: String
    },
    picture: {
        type: String
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    aboutMe: {
        type: String,
    },
    company: {
        type: String,
    },
    country: {
        type: String,
    },
    city : {
        type: String
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema);