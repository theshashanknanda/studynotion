import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCourseData, setCurrentStage } from '../../../reducers/slices/courseSlice'
import { updateCourseStatus } from '../../../services/operations/coursesApi'
import toast from 'react-hot-toast'

const PublishCourse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const courseData = useSelector((state) => state.course.courseData)
  const token = useSelector((state) => state.profile.token)

  const [isPublic, setIsPublic] = useState(false)

  const saveAsDraft = () => {
    dispatch(setCourseData(null))
    dispatch(setCurrentStage(0))

    navigate('/dashboard/my-courses')
  }

  const publishCourse = () => {
    if(!isPublic){
      toast.error('Please confirm by ticking the checkbox')
      return;
    }

    dispatch(updateCourseStatus(token, courseData._id, true))
    dispatch(setCourseData(null))
    dispatch(setCurrentStage(0))

    navigate('/dashboard/my-courses')
  }
  return (
    <div className="bg-[#0F172A] rounded-lg h-fit flex flex-col items-center justify-center p-6">
      {/* Publish Settings Box */}
      <div className="w-full max-w-md bg-[#1E293B] p-6 rounded-md border border-[#334155]">
        <h2 className="text-white text-lg font-semibold mb-4">Publish Settings</h2>
        <label className="inline-flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="form-checkbox h-5 w-5 text-yellow-500 bg-transparent border-gray-600 rounded"
          />
          <span className="text-gray-400 text-sm">Make this Course Public</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">

        <button className="bg-[#1E293B] text-white px-5 py-2 rounded-md border border-gray-600 hover:opacity-80"
        onClick={() => {
          saveAsDraft();
        }}>
          Save as a Draft
        </button>
        <button className="bg-[#FACC15] text-black px-5 py-2 rounded-md hover:opacity-80 font-medium"
        onClick={() => {
          publishCourse()
        }}>
          Save and Publish
        </button>
      </div>
    </div>
  )
}

export default PublishCourse
