import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'

const HabitDetails = () => {
    const navigate = useNavigate()

    const goBack = () => { navigate('/myhabits') }
    const goTo = () => { navigate('/myhabits/form') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back', 'ellipsis']} title={'Habit title here'} backOnclick={goBack} ellipsisOnClick={goTo}/>
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                Habit details page
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitDetails
