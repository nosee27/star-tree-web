const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, '请输入手机号'],
        unique: true,
        match: [/^1[3-9]\d{9}$/, '请输入有效的手机号']
    },
    nickname: {
        type: String,
        default: () => `星树#${Math.floor(Math.random() * 9999)}`
    },
    avatar: {
        type: String,
        default: 'https://api.dicebear.com/7.x/avataaars/svg?seed='
    },
    anonymityLevel: {
        type: Number,
        default: 3,
        min: 1,
        max: 5
    },
    mood: {
        type: String,
        default: 'happy'
    },
    plants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    }],
    achievements: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    next();
});

module.exports = mongoose.model('User', userSchema);