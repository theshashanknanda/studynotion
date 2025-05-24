import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../services/operations/coursesApi';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
  const token = useSelector((state) => state.profile.token)
  const user = useSelector((state) => state.profile.user)
  const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()

  const [courses, setCourses] = useState([])

  useEffect(() => {
    dispatch(getEnrolledCourses(token, setCourses))
  }, [])
  return (
    <div className='text-whit w-[90%] mx-auto p-4'>
      {
        loading ? (<Loader/>) : 
        (
          <div>
            <div className='text-2xl text-left font-semibold'>Enrolled Courses</div>

<div className='w-[90%] mt-9 border rounded-lg border-[#858484]'>
  <div className='flex items-center justify-between bg-[#2B333F] p-4 rounded-t-lg'>
    <p className='w-[30%]'>Course Name</p>
    <p>Price</p>
    <p className='w-[30%]'>Progress</p>
  </div>

  {
    courses.map((course, index) => {
      return (<Link to='/dashboard/view-course' state={{course}}>
      <div key={index} className='flex items-center justify-between rounded-b-lg bg-[#000814] p-4'>
        <div className='flex gap-4 items-center text-left w-[30%]'>
          <img src={course.thumbnail} alt='icon' className='w-[70px]'/>
          <div>
            <p className='text-lg'>{course.courseName}</p>
            <p className='opacity-60'>{course.courseDescription}</p>
          </div>
        </div>

        <div className='text-left font-semibold text-lg opacity-80'>
          $ {course.price}
        </div>

        <div className='w-[30%]'>
          <p className='text-left pb-2 text-md font-semibold opacity-70'>Progress {course.completionPercentage}%</p>
          <ProgressBar completed={course.completionPercentage} height="10px" isLabelVisible={false}/>
        </div>
      </div>
      </Link>)
    })
  }

</div>
          </div>
        )
      }
    </div>
  )
}

export default EnrolledCourses
