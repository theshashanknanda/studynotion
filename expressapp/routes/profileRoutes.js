const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {updateProfile, deleteProfile, getUserDetails} = require('../controllers/profileController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.put('/updateProfile', auth, updateProfile)
router.delete('/deleteProfile', auth, deleteProfile)
router.get('/getUserDetails', auth, getUserDetails)

module.exports = router