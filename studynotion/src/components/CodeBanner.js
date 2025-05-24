import React from 'react'
import BoldText from './BoldText'
import HighlightedText from './HighlightedText'
import PrimaryButton from './PrimaryButton'
import { TypeAnimation } from 'react-type-animation'
import { FaArrowRight } from 'react-icons/fa'

const CodeBanner = ({ forward, codeblock, title, description }) => {
  return (
    <div className={`flex gap-16 w-[90%] mx-auto p-8 ${forward ? `` : `flex-row-reverse`} mt-8`}>
      <div className='w-[50%] flex flex-col gap-8 justify-start'>
        <div className='text-left'>
            <BoldText>Unlock Your </BoldText>
            <HighlightedText> {title} </HighlightedText>
            <BoldText>with our Online Courses</BoldText>
        </div>

        <p className='text-[#838894] text-md font-semibold pt-2 text-left'>
            {description}
        </p>

        <div className='flex gap-4 w-fit pt-8'>
            <PrimaryButton color="#FED608" textColor="#111111">try it yourself <FaArrowRight/></PrimaryButton>
            <PrimaryButton color="#161D29" textColor="#FFFFFF">Learn more</PrimaryButton>
        </div>
      </div>

      <div className='w-[50%] flex justify-start'>
        <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>
        <div className='text-[#FED50A] font-semibold'>
            <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
            className='text-left p-4'
            />
        </div>

      </div>
    </div>
  )
}

export default CodeBanner
