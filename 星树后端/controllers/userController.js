const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 模拟验证码存储（生产环境应使用 Redis）
const verificationCodes = {};

exports.register = async (req, res) => {
    try {
        const { phone, email, password } = req.body;
        
        // 根据输入判断是手机号还是邮箱
        let identifier = phone || email;
        let query = phone ? { phone } : { email };
        
        let user = await User.findOne(query);
        
        if (user) {
            return res.status(400).json({ success: false, message: '该账号已注册' });
        }
        
        user = await User.create({ phone, email, password });
        
        const token = generateToken(user._id);
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                phone: user.phone,
                email: user.email,
                nickname: user.nickname,
                avatar: user.avatar,
                anonymityLevel: user.anonymityLevel
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, email, verificationCode, password } = req.body;
        
        // 根据输入判断是手机号还是邮箱
        let query = phone ? { phone } : { email };
        
        const user = await User.findOne(query);
        
        if (!user) {
            return res.status(400).json({ success: false, message: '该账号未注册' });
        }
        
        // 如果提供了验证码，验证验证码
        if (verificationCode) {
            const storedCode = verificationCodes[phone || email];
            if (!storedCode || storedCode !== verificationCode) {
                return res.status(400).json({ success: false, message: '验证码错误' });
            }
            // 验证成功后删除验证码
            delete verificationCodes[phone || email];
        } else if (password) {
            // 如果提供了密码，验证密码
            if (user.password !== password) {
                return res.status(400).json({ success: false, message: '密码错误' });
            }
        } else {
            return res.status(400).json({ success: false, message: '请提供验证码或密码' });
        }
        
        const token = generateToken(user._id);
        
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                phone: user.phone,
                email: user.email,
                nickname: user.nickname,
                avatar: user.avatar,
                anonymityLevel: user.anonymityLevel
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.sendVerificationCode = async (req, res) => {
    try {
        const { account } = req.body;
        
        if (!account) {
            return res.status(400).json({ success: false, message: '请输入账号' });
        }
        
        // 生成6位验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 存储验证码（有效期5分钟）
        verificationCodes[account] = code;
        
        // 模拟发送验证码（实际项目中应调用短信/邮件服务）
        console.log(`验证码发送成功: ${account} -> ${code}`);
        
        // 5分钟后自动删除验证码
        setTimeout(() => {
            delete verificationCodes[account];
        }, 5 * 60 * 1000);
        
        res.status(200).json({
            success: true,
            message: '验证码已发送'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-__v');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAnonymity = async (req, res) => {
    try {
        const { level } = req.body;
        
        if (level < 1 || level > 5) {
            return res.status(400).json({ success: false, message: '匿名等级必须在1-5之间' });
        }
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { anonymityLevel: level },
            { new: true }
        );
        
        res.status(200).json({
            success: true,
            anonymityLevel: user.anonymityLevel
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};