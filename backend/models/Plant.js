const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['lavender', 'cactus', 'sunflower', 'rose', 'tree', 'friendship']
    },
    name: {
        type: String,
        required: true
    },
    growth: {
        type: Number,
        default: 0,
        max: 100
    },
    waterLevel: {
        type: Number,
        default: 100,
        max: 100
    },
    lastWatered: {
        type: Date,
        default: Date.now
    },
    plantedAt: {
        type: Date,
        default: Date.now
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

module.exports = mongoose.model('Plant', plantSchema);