import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs";


const CourseUploadTips = () => {
  return (
    <div className='bg-[#161D29] p-6 rounded-lg w-full'>
      <div className='flex items-center gap-2 mb-6'>
        <BsLightningChargeFill className='text-xl text-[#CBAA0B]'/>
        <h3 className='font-semibold text-lg'>Course Upload Tips</h3>
      </div>

      <ul className='space-y-4 text-sm text-gray-300'>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Set the Course Price option or make it free.</span>
        </li>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Standard size for the course thumbnail is 1024×576.</span>
        </li>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Video section controls the course overview video.</span>
        </li>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Course Builder is where you create & organize a course.</span>
        </li>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</span>
        </li>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Information from the Additional Data section shows up on the course single page.</span>
        </li>
        <li className='flex gap-3'>
          <span className='text-[#CBAA0B]'>•</span>
          <span>Make Announcements to notify any important notes to all enrolled students at once.</span>
        </li>
      </ul>
    </div>
  )
}

export default CourseUploadTips
