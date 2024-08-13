import React, { useState, useEffect } from 'react'
import { weekDaysShort, formatDate } from '../../utils/DateUtils'
import { getDayCount } from '../../services/CheckinServices'

const WeekdayCard = ({ habit, day }) => {
    const [dailyCount, setDailyCount] = useState(0)

    useEffect(() => {
        getDayCount(habit.habit_id, formatDate(day))
            .then(response => setDailyCount(response))
    }, [habit.habit_id, day])

    // get the letter of a week day
    const getDayLetter = (date) => {
        return (weekDaysShort[date])
    }

    return (
        <div className='center-of-div flex-col flex-1 items-center justify-center gap-2'>
                <div className={`text-sm font-bold text-appPrimaryColor w-full flex flex-row justify-center ${habit.weekdays.includes(day.getDay().toString()) ? 'border-b-2 border-appPrimaryColor' : 'border-b border-appVariant-2'}`}>{getDayLetter(day.getDay())}</div>
            <div className='text-md font-bold'>{day.getDate()}</div>
            <div className={`${(dailyCount >= 10) ? 'px-2' : 'px-3'} ${(dailyCount > 0) ? 'bg-appPrimaryColor text-appPrimaryLight' : 'bg-appPrimaryLight'} py-1 rounded-full border border-appPrimaryColor`}>{dailyCount}</div>
        </div>
    )
}

export default WeekdayCard
