import React from 'react'

const NormalButton = ({section,className,onClick}) => {

  const defaultStyle  = {
    borderRadius: '20px',
    margin: '10px'
  }; 

  return (
    <button style={defaultStyle} className={className} onClick={onClick}>
        {section}
    </button>
  )
}

export default NormalButton
