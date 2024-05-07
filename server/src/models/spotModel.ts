import mongoose from "mongoose"

const Schema = mongoose.Schema;

const spotSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    occupied: {
        type: Boolean,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Spot', spotSchema);
