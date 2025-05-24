const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Profile = require('../models/Profile')


exports.updateProfile = async (req, res) => {
    // get data
    const {firstName, lastName, password, newPassword} = req.body;
    const id = req.user._id;

    if(!firstName || !lastName || !password || !newPassword){
        return res
        .status(401)
        .json({
            success: true,
            message: 'All fields are required',
        })
    }
    
    const user = await User.findById(id)
 
    if(!await bcrypt.compare(password, user.password)){
        return res
        .status(401)
        .json({
            success: false,
            message: "Password is incorrect",
        })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUser = await User.findOneAndUpdate({_id: id},{
        firstName,
        lastName,
        password: hashedPassword,
    }, {new: true})

    return res
    .status(200)
    .json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
    })
}

// for future use
exports.deleteProfile = async (req, res) => {
    const id = req.user._id;

    const user = await User.findById(id)
    if(!user){
        return res
        .status(401)
        .json({
            success: false,
            message: "Account not found"
        })
    }

    await Profile.findByIdAndDelete(user.additionalDetails)
    await User.findByIdAndDelete(id)

    return res
    .status(200)
    .json({
        success: true,
        message: "User deleted successfully",
    })
}

exports.getUserDetails = async (req, res, next) => {
    try{
        const id = req.user._id;
        const user = await User.findById(id).populate("additionalDetails").exec()
        user.toJSON()

        return res
        .status(200)
        .json({
            success: true,
            message: "User data fetched successfully",
            data: user,
        })
    }catch(error){
        next(error)
    }
}
