import mongoose, { Schema, model } from 'mongoose';

const groupSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requird: true
    },
    groupMember: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});
export default model('Group', groupSchema);
