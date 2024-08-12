import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import HabitDetailsCard from '../components/habitsdetails/HabitDetailsCard'
import BasicStatistics from '../components/mystatistics/BasicStatistics'
import PastWeekStatistics from '../components/mystatistics/PastWeekStatistics'
import CurrentMonthStatistics from '../components/mystatistics/CurrentMonthStatistics'

const StatisticDetails = () => {
    // habit passed from route state
    const { state: { habit, totalCheckins } = {} } = useLocation();

    const navigate = useNavigate()

    const navigateBack = () => { navigate('/mystatistics') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={habit.habit_name} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-3 py-3 my-[56px] px-3 lg:px-5'>
                {/* basic statistics */}
                <BasicStatistics habit={habit} totalCheckins={totalCheckins} />

                {/* habit detail */}
                <HabitDetailsCard habit={habit} />

                {/* past week checkin statistics */}
                <PastWeekStatistics habit={habit} />

                {/* current month checkin statistics */}
                <CurrentMonthStatistics habit={habit} />
            </div>
            <BottomBar current={1} />
        </div>
    )
}

export default StatisticDetails
