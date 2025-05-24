const User = require('../models/User')
const bcrypt = require('bcryptjs')
const mailSender = require('../utils/mailSender')

exports.sendPasswordResetToken = async (req, res, next) => {
    try{
            /**
             * get email
             * check if user exists
             * generate & save a token
             * send an email with the token
             * return success
             */
            const {email} = req.body;

            if(!email){
                return res
                .status(400)
                .json({
                    success: false,
                    message: "Email is required",
                })
            }

            const user = await User.findOne({email})
            if(!user){
                return res
                .status(401)
                .json({
                    success: true,
                    message: "User not registered"
                })
            }

            const randomUID = crypto.randomUUID()
            const updatedUser = await User.findOneAndUpdate({email}, {
                passwordResetToken: randomUID,
                resetPasswordExpires: Date.now() + 60*5*1000,
            }, {new: true})

            if(updatedUser){
                console.log(updatedUser)

                const url = `http://localhost:3000/resetPassword/${randomUID}`
                await mailSender(email, "Reset password link", `
                    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
      <h2 style="color: #333333; margin-bottom: 20px;">Password Reset Request</h2>

      <p style="color: #444444; font-size: 16px; margin: 0 0 15px 0;">Hello,</p>

      <p style="color: #444444; font-size: 16px; margin: 0 0 20px 0;">
        You recently requested to reset your password. Click the button below to proceed:
      </p>

      <a href="${url}" style="display: inline-block; background-color: #6366F1; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px; text-decoration: none; margin: 20px 0;">
        Reset Your Password
      </a>

      <p style="color: #888888; font-size: 14px; margin: 30px 0 10px 0;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="color: #444444; font-size: 16px;">Thanks,<br />The Support Team</p>

      <div style="margin-top: 40px; font-size: 12px; color: #999999; text-align: center;">
        © 2025 Your Company. All rights reserved.
      </div>
    </div>
  </body>
</html>

                    `)

                return res
                .status(200)
                .json({
                    success: true,
                    message: `Password reset link sent to the email ${email}`
                })
            }
        }catch(error){
            next(error)
        }
    }

exports.resetPassword = async(req, res, next) => {
        /**
         * get the token & new password
         * retrieve user with the token
         * validate token
         * check if new password is not same as old password
         * hash new password
         * set new password to the user
         * return success
         */

    try{
        const {token, newPassword} = req.body;

        if(!token || !newPassword){
            return res
            .status(400)
            .json({
                success: false,
                message: "All fields are required",
            })
        }

        const user = await User.findOne({passwordResetToken: token})
        if(!user){
            return res
            .status(400)
            .json({
                success: false,
                message: "User not found",
            })
        }

        if(user.resetPasswordExpires < Date.now()){
            return res
            .status(401)
            .json({
                success: false,
                message: "Reset link is expired",
            })
        }

        if(await bcrypt.compare(newPassword, user.password)){
            return res
            .status(400)
            .json({
                success: false,
                message: "New password cannot be the same as old password",
            })
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        const updatedUser = await User.findOneAndUpdate({email: user.email}, {
            password: newHashedPassword
        }, {new: true})

        return res
        .status(200)
        .json({
            success: true,
            message: "Password updated succesfully",
        })
    }catch(error){
        next(error)
    }
}
