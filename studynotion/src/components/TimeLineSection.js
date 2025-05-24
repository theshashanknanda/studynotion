import React from 'react'

import Logo1 from "../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];

const TimeLineSection = () => {
  return (
    <div className='text-black flex gap-4 w-[80vw] mx-auto justify-between'>
      <div className=''>
        {
            timeline.map((item, index) => {
                return (
                    <div className='flex justify-center items-center gap-8 py-4'
                    key={index}>
                        <div>
                            <img src={item.Logo} alt=''/>
                        </div>
                        <div>
                            <div className='font-bold text-lg text-left'>{item.heading}</div>
                            <p className='text-left font-medium'>{item.Description}</p>
                        </div>
                    </div>
                )
            })
        }
      </div>
      <div>
        <img src={timelineImage} alt='' className='w-[80%]'/>
        <div className='relative w-[60%]'>
            <div className='absolute -top-12 flex bg-[#004A32] text-white gap-6 px-8 py-4'>
                <div className='flex items-center gap-4'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='opacity-80'>YEARS OF EXPERIENCE</p>
                </div>
                <div className='flex items-center gap-4'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='opacity-80'>TYPE OF COURSES</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection
