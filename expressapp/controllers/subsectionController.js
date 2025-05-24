const mongoose = require('mongoose')
const subSection = require('../models/SubSection')
const {uploadImageToCloudinary} = require('../utils/uploadImageToCloudinary');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
require('dotenv').config()

exports.createSubSection = async (req, res, next) => {
    try{
        /**
         * get all fields wtih sectionId
         * upload video to cloudinary & get secure_url
         * create SubSection in db
         * update SubSection id in corresponding Section
         */

        const {title, description, sectionId} = req.body;
        const video = req.files.video;

        if(!title || !description || !sectionId){
            return res
            .status(400)
            .json({
                success: false,
                message: "All fields are required",
            })
        }

        const uploadInfo = await uploadImageToCloudinary(video.tempFilePath, process.env.FOLDER_NAME)
        console.log(uploadInfo)

        const subSection = await SubSection.create({
            title,
            description,
            videoUrl: uploadInfo.secure_url,
            timeDuration: uploadInfo.timeDuration,
        })

        const section = await Section.findOneAndUpdate({_id: sectionId}, {
            $push: {
                subSection: subSection,
            }
        }, {new: true})
        .populate("subSection")
        .exec()

        return res
        .status(200)
        .json({
            success: true,
            message: "Sub section created successfully",
            data: section,
        })
    }catch(error){
        next(error)
    }
}

// exports.updateSubSection = async (req, res, next) => {
//     try{
//         const {subSectionId, title, description} = req.body;
//         const video = req.files.video;

//         if(!subSectionId || !title || !description){
//             return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: "All fields are required",
//             })
//         }
        
//         const newVideoInfo = await uploadImageToCloudinary(video.tempFilePath, process.env.FOLDER_NAME)
//         const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {
//             title,
//             description,
//             videoUrl: newVideoInfo.secure_url,
//             timeDuration: newVideoInfo.timeDuration,
//         }, {new: true})
//         console.log(`new url ${newVideoInfo.secure_url}`)
//         console.log(`new subsection ${updatedSubSection}`)

//         return res
//         .status(200)
//         .json({
//             success: true,
//             message: "SubSection updated successfully",
//             data: subSection,
//         })
//     }catch(error){
//         next(error)
//     }
// }

exports.updateSubSection = async (req, res, next) => {
    try {
      const { subSectionId, title, description } = req.body;
  
      if (!subSectionId || !title || !description) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const updatePayload = {
        title,
        description,
      };
  
      if (req.files && req.files.video) {
        const video = req.files.video;
        const newVideoInfo = await uploadImageToCloudinary(video.tempFilePath, process.env.FOLDER_NAME);
  
        updatePayload.videoUrl = newVideoInfo.secure_url;
        updatePayload.timeDuration = newVideoInfo.timeDuration;
      }
  
      const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, updatePayload, { new: true });
  
      return res.status(200).json({
        success: true,
        message: "SubSection updated successfully",
        data: updatedSubSection,
      });
    } catch (error) {
      next(error);
    }
  };
  

exports.deleteSubSection = async (req, res, next) => {
    try{
        const {sectionId, subSectionId} = req.body;

        if(!sectionId || !subSectionId){
            return res
            .status(400)
            .json({
                success: false,
                message: "All fields are required",
            })
        }

        const subSection = await SubSection.findById(subSectionId)
        if(!subSection){
            return res
            .status(400)
            .json({
                success: false,
                message: "SubSection not found",
            })
        }

        await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId,
            }
        })

        await SubSection.findByIdAndDelete(subSectionId)

        return res
        .status(200)
        .json({
            success: true,
            message: "SubSection deleted successfully",
        })
    }catch(error){
        next(error)
    }
}
