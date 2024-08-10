import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'

const HabitDetails = () => {
    // habit passed from route state
    const { state: { habit, dailyCount, weeklyCount, monthlyCount, totalCount } = {} } = useLocation();

    const navigate = useNavigate()

    // navigate back to habits home page
    const navigateBack = () => { navigate('/myhabits') }

    // navigate to edit habit page
    const navigateTo = () => {
        navigate('/myhabits/form', {
            state: { mode: 'Edit', habit: habit, dailyCount: dailyCount, weeklyCount: weeklyCount, monthlyCount: monthlyCount, totalCount: totalCount }
        })
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back', 'ellipsis']} title={habit.habit_name} backOnclick={navigateBack} ellipsisOnClick={navigateTo} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                <div className='center-of-div flex-row'>
                    <div>
                        <div>{dailyCount}</div>
                        <div>Weekly: {weeklyCount}</div>
                        <div>Monthly: {monthlyCount}</div>
                        <div>Total: {totalCount}</div>
                    </div>
                    <div>Anatomy Study Sketch</div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitDetails
