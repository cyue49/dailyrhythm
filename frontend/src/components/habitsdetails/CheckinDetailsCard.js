import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { formatDate, formatDateMonthStart, formatDateWeekAgo } from '../../utils/DateUtils'
import { getCountBetween } from '../../services/CheckinServices'

const CheckinDetailsCard = ({ currentDay, habit, weeklyCount, setWeeklyCount, monthlyCount, setMonthlyCount, dailyCount }) => {
    // fetch weekly checkin count
    useEffect(() => {
        const today = formatDate(new Date())
        const weekAgo = formatDateWeekAgo(currentDay)
        getCountBetween(habit.habit_id, weekAgo, today)
            .then(response => setWeeklyCount(response))
    }, [currentDay, habit.habit_id, setWeeklyCount]);

    // fetch monthly checkin count
    useEffect(() => {
        const today = formatDate(new Date())
        const monthStart = formatDateMonthStart(currentDay)
        getCountBetween(habit.habit_id, monthStart, today)
            .then(response => setMonthlyCount(response))
    }, [currentDay, habit.habit_id, dailyCount, setMonthlyCount]);

    return (
        <div className='flex flex-col items-start justify-center bg-appWhite rounded-3xl px-5 py-3 gap-2'>
            <div className='text-lg font-bold'>Check-in Details</div>
            <div className='flex flex-row justify-start items-center gap-2 w-full'>
                <FontAwesomeIcon className='text-appGreen text-lg' icon={faCalendarWeek} />
                <div className='flex-1'>This past week: </div>
                <div className='font-bold text-appGreen text-lg flex-1 center-of-div'>{weeklyCount}</div>
            </div>
            <div className='flex flex-row justify-start items-center gap-2 w-full'>
                <FontAwesomeIcon className='text-appGreen text-lg' icon={faCalendarDays} />
                <div className='flex-1'>This past month: </div>
                <div className='font-bold text-appGreen text-lg flex-1 center-of-div'>{monthlyCount}</div>
            </div>
        </div>
    )
}

export default CheckinDetailsCard
