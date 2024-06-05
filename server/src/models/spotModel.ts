import mongoose from "mongoose"

const Schema = mongoose.Schema;

const spotSchema = new Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    reserved: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Spot = mongoose.model('Spot', spotSchema);

export default Spot;
