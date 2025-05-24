const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 2*60,
    }
});

OTPSchema.pre("save", async function(next) {
    mailSender(this.email, "Verification email for Study Notion", `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Your OTP Code</title>
        </head>
        <body style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
            <td style="text-align: center; padding-bottom: 20px;">
                <h2 style="color: #333333; margin: 0;">Your One-Time Password (OTP)</h2>
            </td>
            </tr>
            <tr>
            <td style="text-align: center; padding: 20px 0;">
                <p style="font-size: 16px; color: #666666;">Use the code below to proceed:</p>
                <div style="display: inline-block; margin: 20px 0; padding: 15px 25px; background-color: #4CAF50; color: white; font-size: 24px; letter-spacing: 4px; border-radius: 5px;">
                ${this.otp}
                </div>
                <p style="font-size: 14px; color: #999999; margin-top: 20px;">This OTP is valid for 10 minutes.</p>
            </td>
            </tr>
            <tr>
            <td style="padding-top: 30px; text-align: center;">
                <p style="font-size: 12px; color: #aaaaaa;">If you did not request this code, please ignore this email.</p>
            </td>
            </tr>
        </table>
        </body>
        </html>
`)
    next()
})

module.exports = mongoose.model("OTP", OTPSchema)