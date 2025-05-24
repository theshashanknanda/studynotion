const Course = require("../models/Course");
const Section = require("../models/Section");

// create
exports.createSection = async (req, res, next) => {
    try{
        const {sectionName, courseId} = req.body;

        const section = await Section.create({sectionName: sectionName})

        const updatedCourse = await Course.findOneAndUpdate({_id: courseId}, {
            $push: {
                courseContent: section
            }
        }, {new: true})
        .populate("courseContent")
        .exec()

        return res
        .status(200)
        .json({
            success: true,
            message: "section created successfully",
            data: updatedCourse,
        })
    }catch(error){
        next(error)
    }
}

// update
exports.updateSection = async (req, res, next) => {
    try{
        const {sectionName, sectionId} = req.body;
        const section = await Section.findById(sectionId)
        
        if(!section){
            return res
            .status(400)
            .json({
                success: false,
                message: "Section not found"
            })
        }

        const updatedSection = await Section.findOneAndUpdate({_id: sectionId}, {
            sectionName: sectionName,
        }, {new: true})

        return res
        .status(200)
        .json({
            success: true,
            message: "section updated successfully",
            data: this.updateSection,
        })
    }catch(error){
        next(error)
    }
}

// delete
exports.deleteSection = async(req, res, next) => {
    try{
        const {sectionId} = req.body;
        const section = Section.findById(sectionId)

        if(!section){
            return res
            .status(400)
            .json({
                success: false,
                message: "Section not found"
            })
        }

        await Section.findOneAndDelete({_id: sectionId})

        return res
        .status(200)
        .json({
            success: true,
            message: "Section deleted successfully"
        })
    }catch(error){
        next(error)
    }
}

// getAllSections 
exports.getAllSections = async(req, res, next) => {
    try{
        const { courseId } = req.body;
        console.log(courseId)
        const course = await Course.findById(courseId)
        .populate({
            path: 'courseContent',
            populate: {
              path: 'subSection', // field in Section schema
              model: 'SubSection'  // name of the model to populate
            }
          })
        .exec()

        if(!course){
            return res
            .status(400)
            .json({
                success: false,
                message: "Course not found"
            })
        }

        return res
        .status(200)
        .json({
            success: true,
            data: course.courseContent,
        })
    }catch(error){
        next(error)
    }
}