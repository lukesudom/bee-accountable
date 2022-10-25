//VARIABLES

const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

// Get all goals -- Private -- Route = /api/goals -- WORKING
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })

  res.status(200).json(goals)
})

// Set goals -- Private -- POST -- Route = /api/goals -- WORKING
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
    days: req.body.days
  })

  res.status(200).json(goal)
})

// Update goals -- Private -- POST -- Route = /api/goals/:id -- WORKING
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Checks for the user 
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Auth's the user 
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// Delete goals -- PRIVATE -- Route = /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Auths user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

//EXPORTS

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}