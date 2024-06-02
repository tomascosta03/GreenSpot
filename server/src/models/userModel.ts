import mongoose from 'mongoose';

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
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
