const Plant = require('../models/Plant');
const User = require('../models/User');

const plantTypes = {
    lavender: { name: '薰衣草', emoji: '🌿' },
    cactus: { name: '仙人掌', emoji: '🌵' },
    sunflower: { name: '向日葵', emoji: '🌻' },
    rose: { name: '玫瑰', emoji: '🌹' },
    tree: { name: '小树', emoji: '🌳' },
    friendship: { name: '友谊树', emoji: '🌲' }
};

exports.getPlants = async (req, res) => {
    try {
        const plants = await Plant.find({ user: req.user.id });
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.plantSeed = async (req, res) => {
    try {
        const { mood } = req.body;
        
        let plantType = 'sunflower';
        if (['sad', 'anxious', 'lonely', 'angry'].includes(mood)) {
            plantType = 'lavender';
        } else if (mood === 'tired') {
            plantType = 'cactus';
        }
        
        const plant = await Plant.create({
            user: req.user.id,
            type: plantType,
            name: plantTypes[plantType].name
        });
        
        res.status(201).json({
            success: true,
            plant
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.waterPlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        
        if (!plant) {
            return res.status(404).json({ message: '植物不存在' });
        }
        
        if (plant.user.toString() !== req.user.id) {
            return res.status(403).json({ message: '无权操作此植物' });
        }
        
        plant.waterLevel = Math.min(100, plant.waterLevel + 30);
        plant.growth = Math.min(100, plant.growth + 5);
        plant.lastWatered = Date.now();
        await plant.save();
        
        res.status(200).json({
            success: true,
            plant
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFriendshipTree = async (req, res) => {
    try {
        const { friendId } = req.body;
        
        const friend = await User.findById(friendId);
        
        if (!friend) {
            return res.status(404).json({ message: '好友不存在' });
        }
        
        const plant = await Plant.create({
            user: req.user.id,
            type: 'friendship',
            name: '友谊树',
            friend: friendId
        });
        
        res.status(201).json({
            success: true,
            plant
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};