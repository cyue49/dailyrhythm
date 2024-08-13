import React, { useState, useEffect } from 'react'
import { formatDate } from '../../utils/DateUtils'
import { getDayCount } from '../../services/CheckinServices'

const MonthdayCard = ({ habit, day, today }) => {
    const [dailyCount, setDailyCount] = useState(0)
    const [afterToday, setAfterToday] = useState(false)

    // get total checkin count for this day
    useEffect(() => {
        getDayCount(habit.habit_id, formatDate(day))
            .then(response => setDailyCount(response))
    }, [habit.habit_id, day])

    // check if this day is after today
    useEffect(() => {
        (day.getMonth() === today.getMonth() && day.getDate() > today.getDate()) ? setAfterToday(true) : setAfterToday(false)
    }, [day, today])

    return (
        <div className='center-of-div flex-col flex-1 items-center justify-center'>
            <div className={`text-xs font-bold ${afterToday ? 'text-variantColor' : ''}`}>{day.getDate()}</div>
            <div className={`py-1 rounded-full border ${(dailyCount >= 10) ? 'px-2' : 'px-3'} ${(dailyCount > 0) ? 'bg-primaryColor text-secondaryTextColor' : 'bg-mainBgColor'} ${afterToday ? 'border-variantColor text-variantColor' : 'border-primaryColor'}`}>{dailyCount}</div>
        </div>
    )
}

export default MonthdayCard
