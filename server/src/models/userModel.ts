import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)