const express = require('express');
const router = express.Router();
const { createComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.post('/:id/comments', protect, createComment);
router.get('/:id/comments', getComments);

module.exports = router;