import React from 'react'
import { formatDate } from '../../utils/DateUtils'

const BasicStatistics = ({ habit, totalCheckins }) => {
    return (
        <div className='flex flex-col items-start justify-center bg-appGray-1 rounded-3xl p-3 pb-4 gap-2'>
            {/* date created */}
            <div className='flex flex-row items-center justify-start'>
                <div className='font-bold'>Habit created on: </div>
                <div className='font-bold text-appGreen text-lg center-of-div px-3'>{formatDate(new Date(habit.created_on))}</div>
            </div>

            {/* total checkin & completion rate */}
            <div className='flex flex-row justify-around w-full'>
                <div className='center-of-div flex-col gap-2 border-2 border-appGreen bg-appWhite rounded-3xl p-3 w-5/12 h-36'>
                    <div className='text-5xl font-bold text-appGreen'>{totalCheckins}</div>
                    <div className='font-bold text-appGreen'>Total check-ins</div>
                </div>
                <div className='center-of-div flex-col gap-2 border-2 border-appGreen bg-appWhite rounded-3xl p-3 w-5/12 h-36'>
                    <div className='text-5xl font-bold text-appGreen'>10%</div>
                    <div className='font-bold text-appGreen'>Completion rate</div>
                </div>
            </div>
        </div>
    )
}

export default BasicStatistics
