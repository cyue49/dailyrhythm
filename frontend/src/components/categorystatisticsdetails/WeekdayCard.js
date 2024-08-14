import React, { useState, useEffect } from 'react'
import { weekDaysShort, formatDate } from '../../utils/DateUtils'
import { getTotalCategoryCheckinCountForDay } from '../../services/CheckinServices'

const WeekdayCard = ({ category, day }) => {
    const [dailyCount, setDailyCount] = useState(0)

    useEffect(() => {
        getTotalCategoryCheckinCountForDay(category.category_id, formatDate(day))
            .then(response => setDailyCount(response))
    }, [category.category_id, day])

    // get the letter of a week day
    const getDayLetter = (date) => {
        return (weekDaysShort[date])
    }

    return (
        <div className='center-of-div flex-col flex-1 items-center justify-center gap-2'>
                <div className={`text-sm font-bold text-primaryColor w-full flex flex-row justify-center border-b border-variantColor`}>{getDayLetter(day.getDay())}</div>
            <div className='text-md font-bold'>{day.getDate()}</div>
            <div className={`${(dailyCount >= 10) ? 'px-2' : 'px-3'} ${(dailyCount > 0) ? 'bg-primaryColor text-secondaryTextColor' : 'bg-mainBgColor'} py-1 rounded-full border border-primaryColor`}>{dailyCount}</div>
        </div>
    )
}

export default WeekdayCard
