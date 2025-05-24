const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {sendPasswordResetToken, resetPassword} = require('../controllers/resetPasswordController.js')

router.post('/sendPasswordResetToken', sendPasswordResetToken)
router.post('/resetPassword', resetPassword)

module.exports = router
