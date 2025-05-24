let mongoose = require('mongoose');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async (req, res, next) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res
            .status(400)
            .json({
                success: true,
                message: "All fields are required",
            })
        }

        const category = await Category.create({
            name,
            description,
        })

        return res
        .status(200)
        .json({
            success: true,
            message: "Category created successfully",
            data: category,
        })
    }catch(error){
        next(error)
    }
}

exports.showAllCategoryCourses = async (req, res, next) => {
    try{
        const {categoryId} = req.body;

        if(!categoryId){
            return res
            .status(400)
            .json({
                success: false,
                message: "All fields required"
            })
        }

        // get courses for category 
        const courses = await Course.find({category: categoryId})
        
        //get courses for different categories
        const differentCategories = await Course.find({
            category: {$ne: categoryId},
        })

        return res
        .status(200)
        .json({
            success: true,
            message: "Courses for category fetched successfully",
            data: {
                inCategory: courses,
                notInCategory: differentCategories,
            },
        })
    }catch(error){
        next(error)
    }
}

exports.getAllCategories = async (req, res, next) => {
    try{
        const categories = await Category.find({})

        return res
        .status(200)
        .json({
            success: true,
            message: "All categories fetched successfully",
            data: categories,
        })
    }catch(error){
        next(error)
    }
}