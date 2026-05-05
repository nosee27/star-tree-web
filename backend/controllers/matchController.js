const Match = require('../models/Match');
const User = require('../models/User');

exports.startMatching = async (req, res) => {
    try {
        const { mood } = req.body;
        
        let existingMatch = await Match.findOne({
            user1: req.user.id,
            status: { $in: ['searching', 'matched', 'chatting'] }
        });
        
        if (existingMatch) {
            return res.status(400).json({ message: '您已经在匹配中' });
        }
        
        const match = await Match.create({
            user1: req.user.id,
            mood
        });
        
        res.status(200).json({
            success: true,
            match: {
                id: match._id,
                status: match.status,
                mood
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkMatchStatus = async (req, res) => {
    try {
        const match = await Match.findOne({
            $or: [
                { user1: req.user.id },
                { user2: req.user.id }
            ],
            status: { $in: ['searching', 'matched', 'chatting'] }
        }).populate('user1 user2', 'nickname avatar mood');
        
        if (!match) {
            return res.status(404).json({ message: '没有进行中的匹配' });
        }
        
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cancelMatching = async (req, res) => {
    try {
        const match = await Match.findOneAndUpdate(
            {
                user1: req.user.id,
                status: 'searching'
            },
            { status: 'ended' },
            { new: true }
        );
        
        if (!match) {
            return res.status(404).json({ message: '没有进行中的匹配' });
        }
        
        res.status(200).json({
            success: true,
            message: '已取消匹配'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.confirmContract = async (req, res) => {
    try {
        const match = await Match.findOneAndUpdate(
            {
                $or: [
                    { user1: req.user.id },
                    { user2: req.user.id }
                ],
                status: 'matched'
            },
            { contractAccepted: true },
            { new: true }
        );
        
        if (!match) {
            return res.status(404).json({ message: '没有需要确认的契约' });
        }
        
        res.status(200).json({
            success: true,
            message: '契约已确认'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.simulateMatch = async (req, res) => {
    try {
        const match = await Match.findOne({
            user1: req.user.id,
            status: 'searching'
        });
        
        if (!match) {
            return res.status(404).json({ message: '没有进行中的匹配' });
        }
        
        const randomUser = await User.aggregate([
            { $match: { _id: { $ne: req.user.id } } },
            { $sample: { size: 1 } }
        ]);
        
        if (randomUser.length > 0) {
            match.user2 = randomUser[0]._id;
            match.status = 'matched';
            match.matchedAt = Date.now();
            await match.save();
            
            res.status(200).json({
                success: true,
                match: await Match.findById(match._id)
                    .populate('user1 user2', 'nickname avatar mood')
            });
        } else {
            res.status(400).json({ message: '暂无匹配用户' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};