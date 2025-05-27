import React from 'react'
import CircularBox from './CircularBox'

const SmallCard = ({name,asset,imgClass,textClass,addClass,outerImgClass,onClick}) => {
  return (
    <CircularBox addClass={addClass}>
        <div className={outerImgClass} onClick={onClick}>
            <img src={asset} className={imgClass}/>
        </div>
      <p className={textClass}>
        {name}
      </p>
    </CircularBox>
  )
}

export default SmallCard
