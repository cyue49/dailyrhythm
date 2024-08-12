import React, { useState, useEffect, useCallback } from 'react'
import { formatDate, formatDateMonthStart, getThisMonthArray, weekDaysShort } from '../../utils/DateUtils'
import { getCountBetween } from '../../services/CheckinServices'
import { getSettings } from '../../services/UserServices'
import MonthdayCard from './MonthdayCard'

const CurrentMonthStatistics = ({ habit }) => {
    const [dayStartTime, setDayStartTime] = useState('0') // time a day starts from user setting
    const [monthlyCount, setMonthlyCount] = useState(0) // total monthly checkins for this month
    const [today, setToday] = useState(new Date()) // today's date
    const [monthDays, setMonthDays] = useState([]) // all days of this month to be displayed

    // fetch day start time from user setting
    useEffect(() => {
        getSettings()
            .then(response => setDayStartTime(response.time_day_starts.toString().slice(0, 2)))
    }, []);

    // set today's date
    useEffect(() => {
        setToday(new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000))
    }, [dayStartTime]);

    // fetch monthly checkin count
    useEffect(() => {
        const todayFormatted = formatDate(today)
        const monthStart = formatDateMonthStart()
        getCountBetween(habit.habit_id, monthStart, todayFormatted)
            .then(response => setMonthlyCount(response))
    }, [habit.habit_id, today]);

    // get all the days to display for this month
    const getMonthDays = useCallback(() => {
        const thisMonth = getThisMonthArray(dayStartTime)
        setMonthDays(thisMonth)
    }, [dayStartTime]);

    useEffect(() => {
        getMonthDays()
    }, [getMonthDays])

    return (
        <div className='flex flex-col items-start justify-center bg-appGray-1 rounded-3xl px-5 py-3 gap-2'>
            <div className='font-bold'>Current Month Check-ins: </div>
            <div className='grid grid-cols-7 grid-flow-row gap-2 w-full p-3 bg-appWhite rounded-3xl'>
                {weekDaysShort.map((day, index) => (
                    <div key={index} className='w-full flex flex-row py-2 items-center justify-center font-bold text-sm text-appGreen'>{day}</div>
                ))}
                {monthDays.map((day, index) => (
                    <MonthdayCard habit={habit} day={day} today={today} key={index} />
                ))}
            </div>

            <div className='flex flex-row py-2 items-center justify-start'>
                <div className='font-bold text-sm'>Total check-ins for this month: </div>
                <div className='font-bold text-appGreen text-lg center-of-div px-3 py-1'>{monthlyCount}</div>
            </div>
        </div>
    )
}

export default CurrentMonthStatistics
