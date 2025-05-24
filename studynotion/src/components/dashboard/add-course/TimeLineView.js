import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStage } from '../../../reducers/slices/courseSlice'

const TimeLineView = () => {
    const items = [
        "Course Information",
        "Course Builder",
        "Publish Course",
    ]

    const courseStage = useSelector((state) => {
        return state.course.currentStage
    })
    const dispatch = useDispatch()
  return (
    <div>
      <div className='text-2xl text-left font-semibold p-4'>Create Course</div>
      <div className='flex gap-4 p-4'>
        {
            items.map((item, index) => {
                return (
                    <div key={index} className='flex items-center gap-4'>
                        <div className={index === courseStage ? "w-[30px] h-[30px] rounded-full bg-[#FFD608] flex items-center justify-center text-black font-semibold" :
                            'w-[30px] h-[30px] rounded-full bg-[#161D29] flex items-center justify-center text-black font-semibold'
                        }>{index + 1}</div>
                        <p className='text-lg font-semibold'>{item}</p>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default TimeLineView
