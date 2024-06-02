import mongoose from "mongoose"

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    licensePlate: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
