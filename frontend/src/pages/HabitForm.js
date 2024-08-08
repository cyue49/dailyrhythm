import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'

const HabitForm = () => {
    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={'New / Edit'} />
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                New habit / edit habit page
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitForm
