import { Error } from 'mongoose'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@dec authentication
// POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error ('Invalid email or password')
    }
 
})

//@dec registration
// POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@dec logout user / clear cookie
// POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'logged Out Succefully'})
})

//@dec get user profile
// GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})

//@dec get user profile
// GET /api/users/profile
// @access priavte
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})


//@dec get users
// GET /api/users/users
// @access priavte/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
})

//@dec get user by ID
// GET /api/users/:id
// @access priavte/admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id')
})


//@dec Delete user
// DELETE /api/users/:id
// @access priavte/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

//@dec Update user
// PUT /api/users/:id
// @access priavte/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserByID,
    getUserProfile,
    updateUserProfile,
    updateUser,
    getUsers,
    deleteUser,
}