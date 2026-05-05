const express = require('express');
const router = express.Router();
const { startMatching, checkMatchStatus, cancelMatching, confirmContract, simulateMatch } = require('../controllers/matchController');
const { protect } = require('../middleware/auth');

router.post('/start', protect, startMatching);
router.get('/status', protect, checkMatchStatus);
router.put('/cancel', protect, cancelMatching);
router.post('/confirm', protect, confirmContract);
router.post('/simulate', protect, simulateMatch);

module.exports = router;