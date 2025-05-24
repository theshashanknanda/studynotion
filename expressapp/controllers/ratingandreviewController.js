const mongoose = require('mongoose');
const User = require('../models/User');
const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

exports.createRatingAndReview = async (req, res, next) => {
    try{
        /**
         * check if user is enrolled in course
         * check if already reviewed the course
         * create a ratingreview object in db
         * add ratingreview in course
         */

        const {userId, courseId, rating, review} = req.body;

        if(!userId || !courseId || !rating || !review){
            return res
            .status(400)
            .json({
                success: false,
                message: "All fields are required",
            })
        }

        const user = await User.findOne({
            courses: {$elemMatch: {$eq: courseId}}
        })

        if(!user){
            return res
            .status(400)
            .json({
                success: false,
                message: "User is not enrolled in the course",
            })
        }

        const prevRating = await RatingAndReview.findOne({_id: userId})
        if(prevRating){
            return res
            .status(400)
            .json({
                success: false,
                message: "User has already reviewed the course",
            })
        }

        const ratingAndReviews = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating: rating,
            review: review,
        })

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {ratingAndReviews: ratingAndReviews._id}
        })
        .populate("ratingAndReviews")
        .exec()

        console.log(updatedCourse)

        return res
        .status(200)
        .json({
            success: true,
            message: "RatingAndReview created successfully",
            data: {
                user: user,
                ratingAndReview: ratingAndReviews,
                updatedCourse: updatedCourse,
            }
        })
    }catch(error){
        next(error)
    }
}

exports.getAverageRating = async (req, res, next) => {
    try{
        const { courseId } = req.body;

        if(!courseId){
            return res
            .status(400)
            .json({
                success: false,
                message: "All fields are required",
            })
        }

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message: "Average rating for the course calculated succesfully",
                averageRating: result[0].averageRating,
            })
        }else{
            return res.status(500).json({
                success:true,
                message: "Query not performed",
            })
        }
    }catch(error){
        next(error)
    }
}

exports.getCourseRatingAndReview = async (req, res, next) => {
    try{
        const { courseId } = req.body;

        if(!courseId){
            return res
            .status(400)
            .json({
                success: true,
                message: "All fields are required",
            })
        }

        const reviews = await RatingAndReview.find({course: courseId})
        .populate({
            path: "user",
        })
        .exec();

        const course = await Course.findById(courseId)

        return res
        .status(200)
        .json({
            success: true,
            message: "Reviews for couse fetched succssefully",
            data: {
                course: course,
                ratingAndReview: reviews,
            }
        })
    }catch(error){
        next(error)
    }
}
