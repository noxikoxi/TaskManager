import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    insuranceTo: {
        type: Date,
        required: true
    },
    inspectionTo: {
        type: Date,
        required: true
    },
    description : {
        type: String,
    },
    productionYear: {
        type: Number
    },
    insurancePrice: {
        type: Number
    },
    userId: {
        type: String,
        required: true
    }
})

export default mongoose.models.Car || mongoose.model("Car", carSchema);