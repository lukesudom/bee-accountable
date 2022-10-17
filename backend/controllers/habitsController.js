const asyncHandler = require("express-async-handler");
const habitModel = require("../model/habitModel");

const Habit = require('../model/habitModel');
const User = require('../model/userModel');

// Find All Habits

// const findHabits = asyncHandler(async(req, res) => {
//     const habits = await Habit.find(req.query).sort({ date: -1}).then(dbHabits => res.json(200)(dbHabits))
    
//     if (!habits) {
//         res.status(400)
//         throw new Error ('Habit was not found');
//     }
// });

const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user.id })

    res.status(200).json(habits)
})


const findUserHabit = asyncHandler(async(req,res) => {
    const habits = await Habit.findById(req.params.id).then(dbHabits => res.json(dbHabits))

    if (!habits) {
        res.status(400)
        throw new Error ('User habits was not found');
    }
});

const createHabits = asyncHandler(async(req,res) => {
   const habits = await Habit.create({
    // text: req.body.text,
    user: req.user.id,
    name: req.body.name,
    iteration: req.body.iteration,
    count: req.body.count,
    description: req.body.description
   })

    if (!req.body.name) {
        res.status(400)
        throw new Error ('Please add a habit in the required field');
    }

    res.status(200).json(habits)
});


const updateHabit = asyncHandler(async (req, res) => {
    const habits = await Habit.findById(req.params.id)

    if (!habits) {
        res.status(400)
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

    if (habits.user.toString() !== user.id) {
        res.status(401)
        throw new Error ('User not auth')
    }

    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {

        new: true
    });

    res.status(200).json(updatedHabit);
});

const removeHabit = asyncHandler(async(req,res) => {
    const habits = await Habit.findById(req.params.id)

    if (!habits) {
        res.status(400)
        throw new Error('Habit not found')
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

    if (habits.user.toString() !== user.id) {
        res.status(401)
        throw new Error ('User not auth')
    }

    await habits.remove()

    res.status(200).json ({ id: req.params.id })
})

module.exports = {
    removeHabit,
    updateHabit,
    // findHabits,
    findUserHabit,
    createHabits,
    getHabits
}