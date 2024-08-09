import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'

const HabitForm = () => {
    const navigate = useNavigate()

    const goBack = () => { navigate('/myhabits/details') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={'New / Edit'} backOnclick={goBack}/>
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                New habit / edit habit page
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitForm
