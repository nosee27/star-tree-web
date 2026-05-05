const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    mood: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'searching',
        enum: ['searching', 'matched', 'chatting', 'ended']
    },
    contractAccepted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    matchedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Match', matchSchema);