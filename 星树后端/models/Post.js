const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, '请输入内容']
    },
    mood: {
        type: String,
        default: 'happy'
    },
    tags: [{
        type: String
    }],
    images: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    resonance: {
        type: Number,
        default: 0
    },
    visibility: {
        type: String,
        default: 'public'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);