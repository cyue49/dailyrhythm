import React, { useState } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import WeeklyCalendar from '../components/myhabits/WeeklyCalendar'
import { weekDaysLong, monthsLong } from '../assets/data/dates'

const MyHabits = () => {
    const [currentDay, setCurrentDay] = useState(new Date())

    const navigate = useNavigate()
    const goTo = () => { navigate('/myhabits/details') }

    const formatDate = (date) => {
        return `${weekDaysLong[date.getDay()]} ${monthsLong[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['plus']} title={'My Habits'} plusOnclick={() => console.log('plus clicked')} />
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 mt-[56px]'>
                <WeeklyCalendar currentDay={currentDay} setCurrentDay={setCurrentDay} />
                <div className='flex flex-col items-start justify-start px-3 lg:px-5 pb-4'>
                    <div className='w-full text-xl font-bold flex flex-row justify-between'>
                        <div>{formatDate(currentDay)}</div>
                        <FontAwesomeIcon className='text-appGray-3' icon={faFilter} />
                    </div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default MyHabits
