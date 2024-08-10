import React, { useState, useEffect, useCallback } from 'react'
import { weekDaysShort } from '../../utils/DateUtils'

const WeeklyCalendar = ({ currentDay, setCurrentDay, dayStartTime }) => {
    const [weekdays, setWeekdays] = useState([]);

    const getWeekdays = useCallback(() => {
        const pastWeekdays = []
        for (var i = 6; i >= 0; i--) {
            var d = new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000)
            d.setDate(d.getDate() - i)
            pastWeekdays.push(d)
        }
        setWeekdays(pastWeekdays)
    }, [dayStartTime]);

    const getDayLetter = (date) => {
        return (weekDaysShort[date])
    }

    useEffect(() => {
        getWeekdays()
    }, [getWeekdays]);

    return (
        <div className='flex flex-row flex-nowrap gap-2 border-b-2 border-appGreen w-full py-2'>
            {weekdays.map((day, index) => (
                <div className='center-of-div flex-col flex-1 items-center justify-center' key={index}>
                    <div className='text-sm text-appGreen'>{getDayLetter(day.getDay())}</div>
                    <div className={`cursor-pointer ${(currentDay.getDate() >= 10) ? 'px-2' : 'px-3'} py-1 rounded-full hover:border-2 hover:border-appGreen button-animation ${(currentDay.getDate() === day.getDate()) ? 'primary-green-button' : ''}`} onClick={() => setCurrentDay(day)}>{day.getDate()}</div>
                </div>
            ))}
        </div>
    )
}

export default WeeklyCalendar
