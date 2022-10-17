const asyncHandler = require("express-async-handler");
const goalModel = require("../model/goalModel");

const Goal = require('../model/goalModel');
const User = require('../model/userModel');

// -- Get goals
// GET /api/goals
// -- Private

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// -- Set goals
// POST /api/goals
// -- Private

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal);
})

// -- Update goals
// PUT /api/goals/:id
// -- Private

const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error ('User not auth')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {

        new: true
    });

    res.status(200).json(updatedGoal);
})

// -- Delete goals
// DELETE /api/goals/:id
// -- Private

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error ('User not auth')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoal

}