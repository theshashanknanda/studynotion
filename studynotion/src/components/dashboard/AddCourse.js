import React from 'react'
import TimeLineView from './add-course/TimeLineView'
import AddCourseInformation from './add-course/AddCourseInformation'
import { useSelector } from 'react-redux'
import CourseBuilder from './add-course/CourseBuilder'
import PublishCourse from './add-course/PublishCourse'
import CourseUploadTips from './add-course/CourseUploadTips'
import Loader from '../Loader'

const AddCourse = () => {
  const currentStage = useSelector((state) => state.course.currentStage)
  const loading = useSelector((state) => state.auth.loading)
  
  return (
    <div className='min-h-screen bg-richblack-900 text-white text-left'>
      <div className='w-full max-w-[1200px] mx-auto px-4 py-8 lg:px-8'>
        <div className='mb-8'>
          <TimeLineView/>
        </div>

        <div className='flex flex-col-reverse lg:flex-row gap-8'>
          {/* Main Content */}
          <div className='w-full lg:w-[70%]'>
            {loading ? (
              <div className='flex justify-center items-center min-h-[400px]'>
                <Loader/>
              </div>
            ) : (
              <div className='bg-richblack-800 rounded-lg p-6'>
                {currentStage === 0 && <AddCourseInformation/>}
                {currentStage === 1 && <CourseBuilder/>}
                {currentStage === 2 && <PublishCourse/>}
              </div>
            )}
          </div>
          
          {/* Tips Sidebar */}
          <div className='w-full lg:w-[30%] lg:sticky lg:top-4'>
            <CourseUploadTips/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
