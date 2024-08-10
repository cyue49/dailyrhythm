import React, { useState } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek, faCalendarDays, faClipboardList, faClock } from '@fortawesome/free-solid-svg-icons'
import { weekDaysLong, formatDate } from '../utils/DateUtils'
import { incrementCheckin } from '../services/CheckinServices'

const HabitDetails = () => {
    // habit passed from route state
    const { state: { currentDay, habit, dailyCount, weeklyCount, monthlyCount, totalCount } = {} } = useLocation();

    // states for habit checkin counts
    const [dailyCountState, setDailyCount] = useState(dailyCount)
    const [weeklyCountState, setWeeklyCount] = useState(weeklyCount)
    const [monthlyCountState, setMonthlyCount] = useState(monthlyCount)
    const [totalCountState, setTotalCount] = useState(totalCount)

    const navigate = useNavigate()

    // navigate back to habits home page
    const navigateBack = () => { navigate('/myhabits') }

    // navigate to edit habit page
    const navigateTo = () => {
        navigate('/myhabits/form', {
            state: { mode: 'Edit', habit: habit, dailyCount: dailyCountState, weeklyCount: weeklyCountState, monthlyCount: monthlyCountState, totalCount: totalCountState }
        })
    }

    const getWeekdays = () => {
        var days = []
        for (let i = 0; i < habit.weekdays.length; i++) {
            days.push(weekDaysLong[parseInt(habit.weekdays.charAt(i))])
        }
        return days.join(', ');
    }

    // handle user clickin on check-in
    const handleCheckin = () => {
        const data = JSON.stringify({
            for_date: formatDate(currentDay),
            habit_id: habit.habit_id
        })
        incrementCheckin(data)
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCountState + 1)
                    setWeeklyCount(weeklyCountState + 1)
                    setMonthlyCount(monthlyCountState + 1)
                    setTotalCount(totalCountState + 1)
                }
            })
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back', 'ellipsis']} title={habit.habit_name} backOnclick={navigateBack} ellipsisOnClick={navigateTo} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-3 mt-[56px] px-3 lg:px-5'>
                <div className='center-of-div flex-row gap-4'>
                    <div className='center-of-div flex-col gap-2 px-2 pb-2'>
                        <div className='bg-appGreen text-appWhite rounded-full py-2 px-4 text-xl font-bold'>{dailyCountState}</div>
                        <div className='font-bold text-appGreen'>Total: {totalCountState}</div>
                    </div>
                    <div className='flex-1 px-4 font-bold text-2xl line-clamp-2 border-l-2 h-full border-l-appGreen flex items-center justify-center'>{habit.habit_name}</div>
                </div>

                <div className='flex flex-col items-start justify-center bg-appGray-1 rounded-3xl px-5 py-3 gap-2'>
                    <div className='text-lg font-bold'>Check-in Details</div>
                    <div className='flex flex-row justify-start items-center gap-2 w-full'>
                        <FontAwesomeIcon className='text-appGreen text-lg' icon={faCalendarWeek} />
                        <div className='flex-1'>This past week: </div>
                        <div className='font-bold text-appGreen text-lg flex-1 center-of-div'>{weeklyCountState}</div>
                    </div>
                    <div className='flex flex-row justify-start items-center gap-2 w-full'>
                        <FontAwesomeIcon className='text-appGreen text-lg' icon={faCalendarDays} />
                        <div className='flex-1'>This past month: </div>
                        <div className='font-bold text-appGreen text-lg flex-1 center-of-div'>{monthlyCountState}</div>
                    </div>
                </div>

                <div className='flex flex-col items-start justify-center bg-appGray-1 rounded-3xl px-5 py-3 gap-2'>
                    <div className='text-lg font-bold'>Habit Details</div>
                    <div className='flex flex-row justify-start items-start gap-2 w-full'>
                        <FontAwesomeIcon className='text-appGreen text-lg' icon={faClipboardList} />
                        <div>Description: </div>
                        <div className='flex-1 border-2 border-appGray-2 rounded-xl px-2 py-1 min-h-12 max-h-20 overflow-auto no-scrollbar'>{habit.description}</div>
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

                <div className='center-of-div flex-row gap-3'>
                    <div className='secondary-red-button hover:primary-red-button button-animation flex-1 center-of-div'>Uncheck-in</div>
                    <div className='secondary-green-button hover:primary-green-button button-animation flex-1 center-of-div' onClick={handleCheckin}>Check-in</div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitDetails
