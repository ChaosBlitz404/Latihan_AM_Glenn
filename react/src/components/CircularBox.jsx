import React from 'react'

const CircularBox = ({children,addClass}) => {
    const defaultStyle = {
        borderRadius: '10px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)'
      }; 
    return (
        <div style={defaultStyle} className={addClass}>
            {children}
        </div>
    )
}

export default CircularBox
