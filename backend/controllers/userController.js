import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

//@dec authentication
// POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
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
    res.send('register user')
})

//@dec logout user / clear cookie
// POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
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
// GET /api/users/:id
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