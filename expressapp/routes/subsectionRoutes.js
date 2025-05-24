const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {createSubSection, updateSubSection, deleteSubSection, getAllSubSections} = require('../controllers/subsectionController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.post('/createSubSection', auth, isInstructor, createSubSection)
router.put('/updateSubSection', auth, isInstructor, updateSubSection)
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection)

module.exports = router
