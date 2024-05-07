import mongoose from "mongoose"

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    dayAndHour: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    reservationCol: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
