const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const { content, mood, tags, images, visibility } = req.body;
        
        const post = await Post.create({
            author: req.user.id,
            content,
            mood,
            tags: tags || [],
            images: images || [],
            visibility: visibility || 'public'
        });
        
        res.status(201).json({
            success: true,
            post
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ visibility: 'public' })
            .populate('author', 'nickname avatar')
            .sort({ createdAt: -1 })
            .limit(20);
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'nickname avatar');
        
        if (!post) {
            return res.status(404).json({ message: '帖子不存在' });
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: '帖子不存在' });
        }
        
        post.likes += 1;
        await post.save();
        
        res.status(200).json({
            success: true,
            likes: post.likes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resonancePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: '帖子不存在' });
        }
        
        post.resonance += 1;
        await post.save();
        
        res.status(200).json({
            success: true,
            resonance: post.resonance
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchPosts = async (req, res) => {
    try {
        const { keyword } = req.query;
        
        const posts = await Post.find({
            $or: [
                { content: { $regex: keyword, $options: 'i' } },
                { tags: { $in: [keyword] } }
            ],
            visibility: 'public'
        }).populate('author', 'nickname avatar');
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};