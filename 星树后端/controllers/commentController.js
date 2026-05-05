const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.id;
        
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: '帖子不存在' });
        }
        
        const comment = await Comment.create({
            post: postId,
            author: req.user.id,
            content
        });
        
        post.comments.push(comment._id);
        await post.save();
        
        res.status(201).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate('author', 'nickname avatar')
            .sort({ createdAt: -1 });
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};