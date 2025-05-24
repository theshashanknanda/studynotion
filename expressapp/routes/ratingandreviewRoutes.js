const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {createRatingAndReview, getAverageRating, getCourseRatingAndReview} = require('../controllers//ratingandreviewController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview)
router.get('/getAverageRating', auth, getAverageRating)
router.get('/getCourseRatingAndReview', auth, getCourseRatingAndReview)

module.exports = router
