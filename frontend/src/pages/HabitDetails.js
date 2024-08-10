import React, { useState } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/DateUtils'
import { incrementCheckin, removeCheckin } from '../services/CheckinServices'
import HabitTitleCard from '../components/habitsdetails/HabitTitleCard'
import CheckinDetailsCard from '../components/habitsdetails/CheckinDetailsCard'
import HabitDetailsCard from '../components/habitsdetails/HabitDetailsCard'

const HabitDetails = () => {
    // habit passed from route state
    const { state: { currentDay, habit } = {} } = useLocation();

    // states for habit checkin counts
    const [dailyCount, setDailyCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [monthlyCount, setMonthlyCount] = useState(0)

    const navigate = useNavigate()

    // navigate back to habits home page
    const navigateBack = () => { navigate('/myhabits') }

    // navigate to edit habit page
    const navigateTo = () => {
        navigate('/myhabits/form', {
            state: { currentDay: currentDay, mode: 'Edit', habit: habit }
        })
    }

    // handle user clicking on check-in
    const handleCheckin = () => {
        const data = JSON.stringify({
            for_date: formatDate(currentDay),
            habit_id: habit.habit_id
        })
        incrementCheckin(data)
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCount + 1)
                    setWeeklyCount(weeklyCount + 1)
                    setTotalCount(totalCount + 1)
                }
            })
    }

    // handle user clicking on uncheck-in
    const handleUncheckin = () => {
        if (dailyCount === 0) return
        removeCheckin(habit.habit_id, formatDate(currentDay))
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCount - 1)
                    setWeeklyCount(weeklyCount - 1)
                    setTotalCount(totalCount - 1)
                }
            })
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back', 'ellipsis']} title={habit.habit_name} backOnclick={navigateBack} ellipsisOnClick={navigateTo} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-3 mt-[56px] px-3 lg:px-5'>
                <HabitTitleCard currentDay={currentDay} habit={habit} dailyCount={dailyCount} setDailyCount={setDailyCount} totalCount={totalCount} setTotalCount={setTotalCount} />

                <CheckinDetailsCard currentDay={currentDay} habit={habit} weeklyCount={weeklyCount} setWeeklyCount={setWeeklyCount} monthlyCount={monthlyCount} setMonthlyCount={setMonthlyCount} dailyCount={dailyCount} />

                <HabitDetailsCard habit={habit} />

                <div className='center-of-div flex-row gap-3'>
                    <div className='secondary-red-button hover:primary-red-button button-animation flex-1 center-of-div' onClick={handleUncheckin}>Uncheck-in</div>
                    <div className='secondary-green-button hover:primary-green-button button-animation flex-1 center-of-div' onClick={handleCheckin}>Check-in</div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitDetails
