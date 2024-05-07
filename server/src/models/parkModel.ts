import mongoose from "mongoose"

const Schema = mongoose.Schema;

const parkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    emptySpaces: {
        type: Number,
        required: true
    },
    occupiedSpaces: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Park', parkSchema);
