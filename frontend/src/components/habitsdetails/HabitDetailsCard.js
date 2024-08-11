import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek, faClipboardList, faClock } from '@fortawesome/free-solid-svg-icons'
import { weekDaysLong } from '../../utils/DateUtils'

const HabitDetailsCard = ({ habit }) => {
    // get weekdays from user goal
    const getWeekdays = () => {
        var days = []
        for (let i = 0; i < habit.weekdays.length; i++) {
            days.push(weekDaysLong[parseInt(habit.weekdays.charAt(i))])
        }
        return days.join(', ');
    }

    return (
        <div className='flex flex-col items-start justify-center bg-appGray-1 rounded-3xl px-5 py-3 gap-2'>
            <div className='text-lg font-bold'>Habit Details</div>
            <div className='flex flex-row justify-start items-start gap-2 w-full'>
                <FontAwesomeIcon className='text-appGreen text-lg' icon={faClipboardList} />
                <div>Description: </div>
                <div className={`flex-1 max-h-20 px-2 overflow-auto no-scrollbar font-bold text-appGreen ${(habit.habit_description === '') ? '' : 'min-h-12 border rounded-xl border-appGreen'}`}>{habit.habit_description}</div>
            </div>
            <div className='flex flex-row justify-start items-center gap-2 w-full'>
                <FontAwesomeIcon className='text-appGreen text-lg' icon={faClock} />
                <div>Frequency: </div>
                <div className={`flex flex-row justify-start items-center ${habit.frequency_count === 0 ? 'hidden' : ''}`}>
                    <div className='font-bold text-appGreen text-lg center-of-div px-3 py-1'>{habit.frequency_count}</div>
                    <div>{(habit.frequency_count === 1) ? 'time' : 'times'} per</div>
                    <div className='font-bold text-appGreen text-lg center-of-div px-3 py-1'>{habit.frequency_type}</div>
                </div>

            </div>
            <div className='flex flex-row justify-start items-center gap-2 w-full'>
                <FontAwesomeIcon className='text-appGreen text-lg' icon={faCalendarWeek} />
                <div>Weekdays: </div>
                <div className={`font-bold text-appGreen text-lg center-of-div px-3 py-1 ${getWeekdays() === '' ? 'hidden' : ''}`}>{getWeekdays()}</div>
            </div>
        </div>
    )
}

export default HabitDetailsCard
