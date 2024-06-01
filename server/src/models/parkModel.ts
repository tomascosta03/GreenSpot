import mongoose from "mongoose"

const Schema = mongoose.Schema;

const parkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
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
