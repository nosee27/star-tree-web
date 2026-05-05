const express = require('express');
const router = express.Router();
const { register, login, getUser, updateAnonymity, sendVerificationCode } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/sendcode', sendVerificationCode);
router.get('/me', protect, getUser);
router.put('/anonymity', protect, updateAnonymity);

module.exports = router;