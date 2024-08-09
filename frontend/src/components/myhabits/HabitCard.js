import React from 'react'

const HabitCard = () => {
    return (
        <div className='w-full flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full bg-appGray-1'>
            <div className='rounded-full border border-appGreen bg-appWhite px-3 py-1'>2</div>
            <div className='flex-1 truncate'>Read a chapter of a book</div>
            <div className='text-xs text-appGray-3 pr-2 font-bold'>Total: 16</div>
        </div>
    )
}

export default HabitCard