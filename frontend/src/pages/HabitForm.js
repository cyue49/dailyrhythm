import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'

const HabitForm = () => {
    // mode and habit passed from route state
    const { state: { mode, habit } = {} } = useLocation();

    const navigate = useNavigate()
    const navigateBack = () => { navigate('/myhabits/details', { state: { habit: habit } }) }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={mode} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                {habit.habit_name}
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitForm
