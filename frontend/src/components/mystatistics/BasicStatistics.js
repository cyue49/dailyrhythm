import React, { useState, useEffect } from 'react'
import { formatDate } from '../../utils/DateUtils'
import { getTotalCheckinDays } from '../../services/CheckinServices';

const BasicStatistics = ({ habit, totalCheckins }) => {
    const [daysCount, setDaysCount] = useState(0)

    // fetch total checkin count
    useEffect(() => {
        getTotalCheckinDays(habit.habit_id)
            .then(response => setDaysCount(response))
    }, [habit.habit_id]);

    return (
        <div className='flex flex-col items-start justify-center bg-appPrimaryLight rounded-3xl p-3 pb-4 gap-2 text-appPrimaryDark'>
            {/* date created */}
            <div className='flex flex-row items-center justify-start'>
                <div className='font-bold'>Habit created on: </div>
                <div className='font-bold text-appPrimaryColor text-lg center-of-div px-3'>{formatDate(new Date(habit.created_on))}</div>
            </div>

            {/* total checkin & days checked-in */}
            <div className='flex flex-row justify-around w-full'>
                <div className='center-of-div flex-col gap-2 border-2 border-appPrimaryColor bg-appPrimaryLight rounded-3xl p-3 w-5/12 h-36'>
                    <div className='text-5xl font-bold text-appPrimaryColor text-center'>{totalCheckins}</div>
                    <div className='font-bold text-appPrimaryColor text-center'>Total check-in counts</div>
                </div>
                <div className='center-of-div flex-col gap-2 border-2 border-appPrimaryColor bg-appPrimaryLight rounded-3xl p-3 w-5/12 h-36'>
                    <div className='text-5xl font-bold text-appPrimaryColor text-center'>{daysCount}</div>
                    <div className='font-bold text-appPrimaryColor text-center'>Total days checked-in</div>
                </div>
            </div>
        </div>
    )
}

export default BasicStatistics
