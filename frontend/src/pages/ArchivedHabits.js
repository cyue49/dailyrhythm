import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'

const ArchivedHabits = () => {
    const navigate = useNavigate()

    const goBack = () => { navigate('/profile') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={'Archived Habits'} backOnclick={goBack} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                Archived habits page
            </div>
            <BottomBar current={3} />
        </div>
    )
}

export default ArchivedHabits
