import React, { useState, useEffect } from 'react'
import { weekDaysShort } from '../../assets/data/dates'

const WeeklyCalendar = ({ currentDay, setCurrentDay }) => {
    const [weekdays, setWeekdays] = useState([]);

    const getWeekdays = () => {
        const pastWeekdays = []
        for (var i = 6; i >= 0; i--) {
            var d = new Date()
            d.setDate(d.getDate() - i)
            pastWeekdays.push(d)
        }
        setWeekdays(pastWeekdays)
    }

    const getDayLetter = (date) => {
        return (weekDaysShort[date])
    }

    useEffect(() => {
        getWeekdays()
    }, []);

    return (
        <div className='flex flex-row flex-nowrap gap-2 border-b-2 border-appGreen w-full py-2'>
            {weekdays.map((day, index) => (
                <div className='center-of-div flex-col flex-1 items-center justify-center' key={index}>
                    <div className='text-sm text-appGreen'>{getDayLetter(day.getDay())}</div>
                    <div className={`cursor-pointer text-appBlack px-3 py-1 ${(currentDay.getDate() === day.getDate()) ? 'text-appWhite rounded-full bg-appGreen font-bold' : ''}`} onClick={() => setCurrentDay(day)}>{day.getDate()}</div>
                </div>
            ))}
        </div>
    )
}

export default WeeklyCalendar
