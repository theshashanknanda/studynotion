const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {createSection, updateSection, deleteSection, getAllSections} = require('../controllers/sectionController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.post('/createSection', auth, isInstructor, createSection)
router.put('/updateSection', auth, isInstructor, updateSection)
router.delete('/deleteSection', auth, isInstructor, deleteSection)
router.post('/getAllSections', auth, getAllSections)

module.exports = router
