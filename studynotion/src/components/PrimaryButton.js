import React from 'react'

const PrimaryButton = ({children, color, textColor}) => {
  return (
    <button style={{backgroundColor: color, color: textColor}} className='py-2 px-4 rounded-md font-semibold hover:scale-95 transition-all duration-200 flex justify-center items-center gap-2 w-fit'>
        {children}
    </button>
  )
}

export default PrimaryButton
