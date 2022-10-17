const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require ('../model/userModel')




// -- Register new user
// POST /api/user
// -- Public

const registerUser = asyncHandler (async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('please add the required fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error ('User already exists')
    }

    // Hashing password

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user

    const user = await User.create ({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error ('invalid user data');
    }

    res.json({message: 'Register user'})
})

// -- Autheticate a user
// POST /api/user/login
// -- Public

const loginUser =asyncHandler (async(req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})
    
    if (user && (await bcrypt.compare(password, user.password)))  {

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error ('Invalid credentials');
    }
})

// -- Get user data
// Get /api/user/me
// -- Private

const getMe =asyncHandler (async(req, res) => {
    res.json({message: 'User data display'})
})

// Gen JWT 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}