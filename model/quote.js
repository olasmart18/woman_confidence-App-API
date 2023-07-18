import mongoose, { Schema, model } from 'mongoose';

const quoteSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
export default model('Quote', quoteSchema);
