import mongoose, { Schema, model } from 'mongoose';

const councellorSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default model('Councellor', councellorSchema);