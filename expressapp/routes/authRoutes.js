const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {sendOTP, signup, login, contactUs} = require('../controllers/authController')

router.post('/sendOTP', sendOTP)
router.post('/login', login)
router.post('/signup', signup)
router.post('/contactUs', contactUs)

module.exports = router
