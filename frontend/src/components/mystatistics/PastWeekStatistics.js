import React, { useState, useEffect, useCallback } from 'react'
import { getSettings } from '../../services/UserServices'
import WeekdayCard from './WeekdayCard'
import { getCountBetween } from '../../services/CheckinServices'
import { formatDate, formatDateWeekAgo } from '../../utils/DateUtils'


const PastWeekStatistics = ({ habit }) => {
    const [dayStartTime, setDayStartTime] = useState('0')
    const [weekdays, setWeekdays] = useState([]);
    const [weeklyCount, setWeeklyCount] = useState(0)

    // fetch day start time from user setting
    useEffect(() => {
        getSettings()
            .then(response => setDayStartTime(response.time_day_starts.toString().slice(0, 2)))
    }, []);

    // get the weekdays of the past week
    const getWeekdays = useCallback(() => {
        const pastWeekdays = []
        for (var i = 6; i >= 0; i--) {
            var d = new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000)
            d.setDate(d.getDate() - i)
            pastWeekdays.push(d)
        }
        setWeekdays(pastWeekdays)
    }, [dayStartTime]);

    // get weekly checkin count
    useEffect(() => {
        const today = formatDate(new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000))
        const weekAgo = formatDateWeekAgo(today)
        getCountBetween(habit.habit_id, weekAgo, today)
            .then(response => setWeeklyCount(response))
    }, [dayStartTime, habit.habit_id]);

    useEffect(() => {
        getWeekdays()
    }, [getWeekdays]);

    return (
        <div className='flex flex-col items-start justify-center bg-subCardColor rounded-3xl px-5 py-3 gap-2'>
            <div className='font-bold'>Past Week Check-ins: </div>
            <div className='flex flex-row flex-nowrap gap-2 w-full p-3 border border-primaryColor rounded-3xl'>
                {weekdays.map((day, index) => (
                    <WeekdayCard habit={habit} day={day} key={index} />
                ))}
            </div>
            <div className='flex flex-row py-2 items-center justify-start'>
                <div className='font-bold text-sm'>Total check-ins in the past week: </div>
                <div className='font-bold text-primaryColor text-lg center-of-div px-3 py-1'>{weeklyCount}</div>
            </div>
        </div>
    )
}

export default PastWeekStatistics
