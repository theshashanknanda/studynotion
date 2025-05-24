const OTP = require('../models/OTP');
const otpgenerator = require('otp-generator');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Profile = require('../models/Profile')
const mailSender = require('../utils/mailSender');

require('dotenv').config()

// send otp
exports.sendOTP = async (req, res, next) => {
    /**
     * Get user email
     * check if user already registered
     * if OTP entry exists for the user return: please try again after 2 mins
     * generate an OTP
     * create a OTP db entry with 2 mins (sends an email in pre middleware)
     * return success response
     */

    try{
        const email = req.body.email;
        if(!email){
            return res
            .status(400)
            .json({
                success: false,
                message: 'Email required',
            })
        }

        const userRegistered = await User.findOne({email})
        if(userRegistered){
            return res
            .status(400)
            .json({
                success: false,
                message: 'User already registered',
            })
        }

        const prevOTP = await OTP.findOne({email})
        console.log(prevOTP)
        if(prevOTP){
            return res
            .status(400)
            .json({
                success: false,
                message: "Please retry again after 2 minutes",
            })
        }

        const otp = otpgenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        const otpEntry = await OTP.create({
            email: email,
            otp: otp,
        })
        console.log(otpEntry)

        return res
        .status(200)
        .json({
            success: true,
            message: 'OTP sent successfully',
        })
    }catch(error){
        next(error)
    }
}

// verify otp- future use
const verifyOTP = async (req, res, next) => {
    /**
     * get user email & user entered OTP
     * search in OTP model for an entry with these email
     * if found -> 
     *  check if correct -> return true
     *        else -> return invalid otp
     * else: return OTP expired try again with a new OTP
     */

    try{
        const {email, otp} = req.body;

        const searchedEntry = await OTP.findOne({email})
        if(searchedEntry){
            if(searchedEntry.otp === otp){
                return res
                .status(200)
                .json({
                    success: true,
                    message: 'OTP verified',
                })
            }else{
                return res
                .status(401)
                .json({
                    success: false,
                    message: 'OTP is invalid',
                })
            }
        }else{
            return res
            .status(401)
            .json({
                success: false,
                message: 'OTP expired, try again with a new OTP'
            })
        }
    }catch(error){
        next(error)
    }
}

// signup
exports.signup = async (req, res, next) => {
    try{
        const {
            firstName,
            lastName, 
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber, 
            otp
        } = req.body;
        console.log(req.body)

        // validate
        if(!firstName || !lastName || !email || !confirmPassword || !password){
            return res
            .status(400)
            .json({
                success: false,
                message: 'All fields are required',
            })
        }

        // check both passwords same
        if(password !== confirmPassword){
            return res
            .status(400)
            .json({
                success: false,
                message: "Passwords do not match",
            })
        }

        // check if user already exists
        const user = await User.findOne({email})
        if(user){
            return res
            .status(400)
            .json({
                success: false,
                message: "User already exists",
            })
        }

        // check for otp
        const recentOTP = await OTP.findOne({email})
        if(recentOTP){
            if(recentOTP.otp === otp){
                // otp correct
                
                // hash password
                const hashedPassword = await bcrypt.hash(password, 10)

                // create profile & user entry
                const profileDetails = await Profile.create({
                    gender:null,
                    dateOfBirth: null,
                    about:null,
                    contactNumer:null,
                });
        
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    password:hashedPassword,
                    accountType,
                    additionalDetails:profileDetails._id,
                    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                })

                return res
                .status(200)
                .json({
                    success: true,
                    data: user,
                    message: 'User registered successfully'
                })
            }else{
                // otp invalid
                return res
                .status(401)
                .json({
                    success: false,
                    message: "Invalid OTP"
                })
            }
        }else{
            // otp not found
            return res
            .status(401)
            .json({
                success: true,
                message: "OTP either not sent or expired. Please try again with a new OTP",
            })
        }
    }catch(error){
        next(error)
    }
}

// login
exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        // check fields
        if(!email || !password){
            return res
            .status(400)
            .json({
                success: false,
                message: "Email or password missing",
            })
        }

        // check if user exists
        const user = await User.findOne({email})
        .populate('additionalDetails')
        .exec()
        if(!user){
            return res
            .status(403)
            .json({
                success: false,
                message: "User does not exist",
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                _id: user._id,
                email: user.email,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            return res
            .cookie("token", token, {
                maxAge: 3600000,
                httpOnly:true,
            })
            .status(200)
            .json({
                success: true,
                message: "Login successfull",
                token: token,
                user: user,
            })
        }else{
            return res
            .status(401)
            .json({
                success: true,
                message: "Email or password does not match"
            })
        }
    }catch(error){
        next(error)
    }
}

// Contact Us Controller
exports.contactUs = async (req, res, next) => {
    try {
        const { firstName, lastName, email, countryCode, phoneNumber, message } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Email content
        const emailSubject = `Contact Us Form Submission from ${firstName} ${lastName}`;
        const emailBody = `
            <h3>Contact Us Form Submission</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${countryCode || ""} ${phoneNumber || ""}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        // Send email using mailSender utility
        await mailSender("shashanknanda.dev@gmail.com", emailSubject, emailBody);

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!",
        });
    } catch (error) {
        console.error("Error in contactUs controller:", error.message);
        next(error);
    }
};