//Requirements

const express = require('express');
const { setgid } = require('process');
const router = express.Router();
const {removeHabit, updateHabit, getHabits, findUserHabit, createHabits } = require('../backend/controllers/habitsController');

const { protect } = require('../backend/middleware/authMiddleware');

//Routes with protect added.

router.route('/').get(protect, getHabits, findUserHabit).post(protect, createHabits);
router.route('/:id').delete(protect, removeHabit).put(protect, updateHabit);


//Exports

module.exports = router;