const express = require('express');
const { setgid } = require('process');
const router = express.Router()
const { getGoals, deleteGoal, updateGoals, setGoal } = require('../backend/controllers/goalController')

const { protect } = require('../backend/middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoals);


module.exports = router