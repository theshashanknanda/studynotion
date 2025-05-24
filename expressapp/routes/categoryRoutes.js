const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {createCategory, showAllCategoryCourses, getAllCategories} = require('../controllers/categoryController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.post('/createCategory', auth, isAdmin, createCategory)
router.post('/showAllCategoryCourses', showAllCategoryCourses)
router.get('/getAllCategories', getAllCategories)

module.exports = router
