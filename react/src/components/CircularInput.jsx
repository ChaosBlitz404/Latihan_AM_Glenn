import React from 'react'

const CircularInput = ({name,placeholder,type,labelClass,section,inputClass,value,onChange,rightIcon,moreStyle,error}) => {
    const defaultInputStyle = {
        borderRadius: '20px',
        padding:'14px 16px',
        border:'1px solid #eee',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
      }; 

    const defaultLabelStyle = {
        fontWeight : 'bold',
        textAlign:'left'
        
    };

    const entireStyle = {
      display:'flex',
      flexDirection:'column',
      gap:'10px',
    };

    const iconStyle = {
      position: 'absolute',
      right: '15px',
      transform: 'translateY(-50%)',
      height: '20px',
      width: '20px',
      pointerEvents: 'none' 
    };

    const inputWrapperStyle = {
      position: 'relative',
      width: '100%',
      marginBottom:'0'
    };

    const anotherStyle = {
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      gap:'0'
    };

  return (
    <div style={entireStyle}>
        <label htmlFor={name} style={defaultLabelStyle} className={labelClass}>{section}</label>
        <div style={anotherStyle}>
          <div style={inputWrapperStyle}>
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} style={defaultInputStyle} className={inputClass}/>
            {rightIcon && <span style={iconStyle} className={moreStyle}>{rightIcon}</span>}
          </div>
          {error && <span style={{ color: 'red',fontSize: 11,marginTop:'5px' }}>{error}</span>}
        </div>
        
    </div>
  )
}

export default CircularInput
