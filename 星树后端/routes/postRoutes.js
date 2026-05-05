const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, likePost, resonancePost, searchPosts } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/:id', getPostById);
router.put('/:id/like', protect, likePost);
router.put('/:id/resonance', protect, resonancePost);

module.exports = router;