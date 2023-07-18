import mongoose, { Schema, model} from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    eventTime: {
        type: Date,
        require: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventSpace: {
        type: Buffer
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }    
});
export default model('Event', eventSchema);