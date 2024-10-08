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
        <div className='center-of-div flex-row gap-4 rounded-3xl p-2 bg-subCardColor text-primaryTextColor'>
            <div className='center-of-div flex-col gap-1 px-4 py-1 rounded-2xl bg-subCardColor border border-primaryColor'>
                <div className='font-bold text-primaryColor text-sm'>{monthsShort[currentDay.getMonth()]} {currentDay.getDate()}</div>
                <div className='bg-primaryColor text-secondaryTextColor rounded-full py-2 px-4 text-xl font-bold'>{dailyCount}</div>
                <div className='font-bold text-primaryColor text-lg'>Total: {totalCount}</div>
            </div>
            <div className='flex-1 px-4 font-bold text-2xl line-clamp-2 flex items-center justify-center'>{habit.habit_name}</div>
        </div>
    )
}

export default HabitTitleCard
