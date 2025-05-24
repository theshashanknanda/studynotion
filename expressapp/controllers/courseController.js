const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category')
const {uploadImageToCloudinary} = require('../utils/uploadImageToCloudinary');
const CourseProgress = require('../models/CourseProgress');
const SubSection = require('../models/SubSection');
const { default: mongoose } = require('mongoose');

exports.createCourse = async (req, res, next) => {
    try{
        /**
         * get userId
         * get all required fields for courses
         * get thumbnail for the course
         * check user type (only instructor allowed)
         * check if valid category
         * upload thumbnail image to cloudinary
         * create course in database
         * add course to instructor's user object
         * return success and course object
         */

        const id = req.user._id;

        const {
            courseName,
            courseDescription,
            instructor,
            whatYouWillLearn,
            price,
            category,
            isPublished,
        } = req.body;

        const file = req.files.thumbnail;
        const tempFilePath = file.tempFilePath;
        console.log("path: " + tempFilePath)

        if(req.user.accountType !== 'Instructor'){
            return res
            .status(401)
            .json({
                success: false,
                message: "Only instructors can create a course",
            })
        } 

        const categoryObject = await Category.findOne({_id: category})
        if(!categoryObject){
            return res
            .status(401)
            .json({
                success: false,
                message: "Category does not exist",
            })
        }

        const uploadedImage = await uploadImageToCloudinary(tempFilePath, process.env.FOLDER_NAME)
        console.log(`Image: ${uploadedImage}`)

        // create course
        const newCourse = await Course.create({
            courseName: courseName,
            courseDescription: courseDescription,
            instructor: id,
            whatYouWillLearn: whatYouWillLearn,
            price: price,
            thumbnail: uploadedImage.secure_url,
            category: categoryObject._id,
            isPublished: isPublished,
        })

        const updatedInstructor = await User.findOneAndUpdate({_id: id}, {
            $push: {
                courses: newCourse,
            }},
        {new: true})

        return res
        .status(200)
        .json({
            success: true,
            message: "Course addedd successfully",
            data: {
                course: newCourse,
                instructor: updatedInstructor,
            }
        })

    }catch(error){
        // next(error)
        console.log(error.message)
    }
}

exports.updateCourse = async (req, res) => {
    try {
      /**
       * Steps:
       * 1. Get course ID and instructor ID
       * 2. Validate course exists and user is authorized
       * 3. Get updatable fields from req.body
       * 4. If a new thumbnail is provided, upload to Cloudinary
       * 5. Update course document
       * 6. Return success response with updated course
       */
  
      const { courseId } = req.body;
      const instructorId = req.user._id;
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      // Check if the current user is the course instructor
      if (course.instructor.toString() !== instructorId.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access to update this course",
        });
      }
  
      const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        category,
        isPublished,
      } = req.body;
  
      // If a new thumbnail image is uploaded
      if (req.files && req.files.thumbnail) {
        const file = req.files.thumbnail;
        const tempFilePath = file.tempFilePath;
        const uploadedImage = await uploadImageToCloudinary(
          tempFilePath,
          process.env.FOLDER_NAME
        );
        course.thumbnail = uploadedImage.secure_url;
      }
  
      // Update provided fields
      if (courseName) course.courseName = courseName;
      if (courseDescription) course.courseDescription = courseDescription;
      if (whatYouWillLearn) course.whatYouWillLearn = whatYouWillLearn;
      if (price) course.price = price;
      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(400).json({
            success: false,
            message: "Invalid category ID",
          });
        }
        course.category = category;
      }
      if (typeof isPublished !== "undefined") course.isPublished = isPublished;
  
      console.log(`----- ${courseName}`)
      await course.save();
  
      return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: course,
      });
    } catch (error) {
      console.log("Error in updateCourse:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update course",
        error: error.message,
      });
    }
  };

  exports.deleteCourse = async (req, res, next) => {
    try{
        const { courseId } = req.body
        await Course.findOneAndDelete({_id: courseId})

        return res
        .status(200)
        .json({
            success: true,
            message: "Course deleted successfully",
        })
    }catch(error){
        next(error)
    }
}
  

exports.updateCourseStatus = async (req, res, next) => {
    try{
        const { courseId, isPublished } = req.body;
        const course = await Course.findOneAndUpdate({_id: courseId}, {
            isPublished: isPublished,
        }, {new: true}).populate("instructor").exec()

        if(!course){
            return res
            .status(404)
            .json({
                success: false,
                message: "Course not found",
            })
        }

        return res
        .status(200)
        .json({
            success: true,
            message: "Course status updated successfully",
            data: course,
        })
    }catch(error){
        next(error)
    }
}

exports.getInstructorCourses = async (req, res, next) => {
    try{
        const id = req.user._id;

        const course = await Course.find({instructor: id})
        .populate([{
            path: 'instructor',
            populate: {
                path: 'additionalDetails'
            }
        },{
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }, {
            path: 'ratingAndReviews',
            populate: {
                path: 'user'
            }
        }]).exec()

        return res
        .status(200)
        .json({
            success: true,
            data: course,
        })
    }catch(error){
        next(error)
    }
}

exports.getAllCourses = async (req, res, next) => {
    try{
        const courses = await Course.find({}).populate("instructor").exec()

        return res
        .status(200)
        .json({
            success: true,
            message: "All courses fetched successfully",
            data: courses,
        })
    }catch(error){
        next(error)
    }
}

exports.getStudentCourses = async (req, res, next) => {
    // SubSection.create({
    //     title: "Python basics",
    //     description: "Python basics",
    //     videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    // })
    try {        
        const studentId = req.user._id;
        const student = await User.findById(studentId)
        .populate([{
            path: 'courses',
            populate: {
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                }
            }
        },
        {
            path: 'courseProgress',
        }
    ])

        const coursesWithCompletion = student.courses.map((course, index) => {
            const courseProgress = student.courseProgress.find((progress) => progress.courseId.toString() === course._id.toString());
            const totalCompleted = courseProgress ? courseProgress.completedVideos.length : 0;

            let totalSubSections = 0;
            course.courseContent.map(section => {
                section.subSection.map(subSection => {
                    totalSubSections += 1;
                })
            }
            )
            console.log(`Course ${course.courseName}, Total Subsections: ` + totalSubSections, `Total Completed: ` + totalCompleted)

            const percent = totalSubSections === 0 || totalCompleted === 0 ? 0 : Math.floor((totalCompleted / totalSubSections) * 100);
            console.log(totalSubSections, totalCompleted, percent)
            
            return {
                ...course.toObject(),
                completionPercentage: percent,
            }
        })

        return res
        .status(200)
        .json({
            success: true,
            message: "Student courses fetched successfully",
            data: coursesWithCompletion,
        })
    } catch (error) {
        next(error);
    }
};

exports.addCourseToStudent = async (req, res, next) => {
    try {
      const id = req.user._id;
      const { courseId } = req.body;
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Check if course already exists in user's courses
      if (user.courses.includes(courseId)) {
        return res.status(400).json({
          success: false,
          message: 'Course already bought',
        });
      }
  
      // Add course if not present
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { courses: courseId } },
        { new: true }
      );
  
      return res.status(200).json({
        success: true,
        message: 'Course added successfully',
        data: {
          user: updatedUser,
        },
      });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

  exports.addCompletedLecture = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { subsectionId, courseId } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const prevProgress = await CourseProgress.find({
        courseId: courseId,
      })

      if(prevProgress.length === 0){
        const courseProgress = await CourseProgress.create({
            courseId: courseId,
          })
      }
  
      // Add subsectionId to courseProgress array
      const progress = await CourseProgress.findOneAndUpdate({
        courseId: courseId,
      }
        ,
        { $addToSet: { completedVideos: subsectionId } },
        { new: true }
      );

      const updatedUser = await User.findByIdAndUpdate(userId, {
        $addToSet: {courseProgress: progress._id}
      })
  
      return res.status(200).json({
        success: true,
        message: "Lecture marked as complete",
        data: {
          user: updatedUser,
        },
      });
  
    } catch (error) {
      console.error("Error in addCompletedLecture:", error.message);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
  