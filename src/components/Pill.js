import React from 'react'

const Pill = ({text, onClick}) => {
  return (
    <div className='pill'>
        <div>
            {text} <span onClick={onClick}> Delete </span> 
        </div>
    </div>
  )
}

export default Pill