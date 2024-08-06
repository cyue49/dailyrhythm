import React from 'react'

const TopBar = ({ type, title }) => {
    return (
        <div className='bg-appGreen text-appWhite'>
            <div className='font-bold text-3xl text-center py-4'>{title}</div>
        </div>
    )
}

export default TopBar
