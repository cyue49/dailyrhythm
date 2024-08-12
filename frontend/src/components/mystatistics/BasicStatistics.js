import React from 'react'

const BasicStatistics = ({ habit, totalCheckins }) => {
    return (
        <div className='flex flex-row justify-around'>
            <div className='center-of-div flex-col gap-2 border-2 border-appGreen rounded-3xl p-3 w-5/12 h-40'>
                <div className='text-5xl font-bold text-appGreen'>{totalCheckins}</div>
                <div className='font-bold text-appGreen'>Total check-ins</div>
            </div>
            <div className='center-of-div flex-col gap-2 border-2 border-appGreen rounded-3xl p-3 w-5/12 h-40'>
                <div className='text-5xl font-bold text-appGreen'>10%</div>
                <div className='font-bold text-appGreen'>Completion rate</div>
            </div>
        </div>
    )
}

export default BasicStatistics
