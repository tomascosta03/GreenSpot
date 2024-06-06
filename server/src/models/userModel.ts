import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    }     
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;