const express = require('express');
const router = express.Router();
const { getPlants, plantSeed, waterPlant, createFriendshipTree } = require('../controllers/plantController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getPlants);
router.post('/', protect, plantSeed);
router.put('/:id/water', protect, waterPlant);
router.post('/friendship', protect, createFriendshipTree);

module.exports = router;