import React from 'react'

const BoldText = ({children, color}) => {
  return (
    <span className={`text-white font-bold text-4xl`}>
      {children}
    </span>
  )
}

export default BoldText
