import React from 'react'

const FancyButton = ({section,className,onClick}) => {

  const defaultStyle  = {
    borderRadius: '20px',
    margin: '10px'
  }; 

  return (
    <button type="submit" style={defaultStyle} className={className} onClick={onClick} >
        {section}
    </button>
  )
}

export default FancyButton
