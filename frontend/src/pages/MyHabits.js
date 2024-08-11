import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import WeeklyCalendar from '../components/myhabits/WeeklyCalendar'
import { weekDaysLong, monthsLong } from '../utils/DateUtils'
import CategoryDivider from '../components/myhabits/CategoryDivider'
import { getCategories } from '../services/CategoryServices'
import { getSettings } from '../services/UserServices'

const MyHabits = () => {
    // states for current day, day start time, list of categories
    const [currentDay, setCurrentDay] = useState(new Date())
    const [categories, setCategories] = useState([])
    const [dayStartTime, setDayStartTime] = useState('0')

    const formatDate = (date) => {
        return `${weekDaysLong[date.getDay()]} ${monthsLong[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    // fetch all user categories
    useEffect(() => {
        getCategories()
            .then(response => setCategories(response))
    }, []);

    // fetch day start time from user setting
    useEffect(() => {
        getSettings()
            .then(response => setDayStartTime(response.time_day_starts.toString().slice(0, 2)))
    }, []);

    // update current day based on user's day start time settings
    useEffect(() => {
        const adjustedDay = new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000)
        setCurrentDay(adjustedDay)
    }, [dayStartTime]);

    const navigate = useNavigate()

    // navigate to create new habit page
    const handleNavigate = () => {
        navigate('/myhabits/form',
            { state: { currentDay: currentDay, mode: 'New', habit: {} } }
        )
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['plus']} title={'My Habits'} plusOnclick={handleNavigate} />
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 my-[56px]'>
                <WeeklyCalendar currentDay={currentDay} setCurrentDay={setCurrentDay} dayStartTime={dayStartTime} />
                <div className='flex flex-col items-start justify-start gap-2 px-4 pb-4 no-scrollbar overflow-y-auto'>
                    <div className='w-full text-xl font-bold flex flex-row justify-between'>
                        <div>{formatDate(currentDay)}</div>
                        <FontAwesomeIcon className='text-appGray-3 cursor-pointer' icon={faFilter} />
                    </div>
                    {categories.map((category, index) => (
                        <CategoryDivider category={category} currentDay={currentDay} key={index} />
                    ))}
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default MyHabits
