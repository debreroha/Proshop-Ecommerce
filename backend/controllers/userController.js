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

        res.status(200).json({
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
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@dec get user profile
// GET /api/users/profile
// @access priavte
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


//@dec get users
// GET /api/users/users
// @access priavte/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

//@dec get user by ID 
// GET /api/users/:id
// @access priavte/admin
const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user) {
        res.status(200).json(user)
    } else{
        res.status(404)
        throw new Error('User no found')
    }
})


//@dec Delete user
// DELETE /api/users/:id
// @access priavte/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error('cannot delete admin user')
        }
        await User.deleteOne({_id: user._id})
        res.status(200).json({message: "User deleted succefully"})
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@dec Update user
// PUT /api/users/:id
// @access priavte/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
      res.status(404)
      throw new Error('User not found')  
    }
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