import React from 'react'

const HighlightedText = ({children, color}) => {
  return (
    <span className="text-[#527987] font-bold text-4xl">
      {children}
    </span>
  )
}

export default HighlightedText
