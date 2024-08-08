import React from 'react'

const TopBar = ({ type, title }) => {
    return (
        <div className='bg-appGreen text-appWhite fixed top-0 z-10 w-full max-w-4xl h-[56px] center-of-div'>
            <div className='font-bold text-2xl text-center'>{title}</div>
        </div>
    )
}

export default TopBar
