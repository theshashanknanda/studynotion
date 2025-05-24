require('dotenv')
const jwt = require('jsonwebtoken')

// verify jwt token
exports.auth = async (req, res, next) => {
    let token = req.header("Authorization")

    if(!token){
        return res
        .status(400)
        .json({
            success: false,
            message: "Token missing",
        })
    }

    token = token.replace("Bearer ", "")

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;

        console.log(req.user)
        next();
    }catch(error){
        return res
        .status(401)
        .json({
            success: false,
            message: "Token is invalid, please login again",
        })
    }
}

// verify if the user is admin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Admin'){
            return res
            .status(403)
            .json({
                success: false,
                message: 'This is a protected route only admins'
            })
        }

        next()
    }catch(error){
        return res
        .status(500)
        .json({
            success: false,
            message: 'User cannot be verified',
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Student'){
            return res
            .status(403)
            .json({
                success: false,
                message: 'This is a protected route only students'
            })
        }

        next()
    }catch(error){
        return res
        .status(500)
        .json({
            success: false,
            message: 'User cannot be verified',
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Instructor'){
            return res
            .status(403)
            .json({
                success: false,
                message: 'This is a protected route only instructors'
            })
        }

        next()
    }catch(error){
        return res
        .status(500)
        .json({
            success: false,
            message: 'User cannot be verified',
        })
    }
}
