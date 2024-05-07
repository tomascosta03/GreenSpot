import mongoose from "mongoose"

const Schema = mongoose.Schema;

const spotSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    occupied: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Spot', spotSchema);
