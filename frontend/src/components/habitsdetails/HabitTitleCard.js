import React, { useEffect } from 'react'
import { formatDate } from '../../utils/DateUtils'
import { getDayCount, getTotalCount, } from '../../services/CheckinServices'
import { monthsShort } from '../../utils/DateUtils'

const HabitTitleCard = ({ currentDay, habit, dailyCount, setDailyCount, totalCount, setTotalCount }) => {
    // fetch daily checkin count
    useEffect(() => {
        const today = formatDate(currentDay)
        getDayCount(habit.habit_id, today)
            .then(response => setDailyCount(response))
    }, [currentDay, habit.habit_id, setDailyCount]);

    // fetch total checkin count
    useEffect(() => {
        getTotalCount(habit.habit_id)
            .then(response => setTotalCount(response))
    }, [habit.habit_id, setTotalCount]);

    return (
        <div className='center-of-div flex-row gap-4'>
            <div className='center-of-div flex-col gap-1 px-2 pb-2'>
                <div className='font-bold text-appGreen text-sm'>{monthsShort[currentDay.getMonth()]} {currentDay.getDate()}</div>
                <div className='bg-appGreen text-appWhite rounded-full py-2 px-4 text-xl font-bold'>{dailyCount}</div>
                <div className='font-bold text-appGreen text-lg'>Total: {totalCount}</div>
            </div>
            <div className='flex-1 px-4 font-bold text-2xl line-clamp-2 border-l-2 h-full border-l-appGreen flex items-center justify-center'>{habit.habit_name}</div>
        </div>
    )
}

export default HabitTitleCard
