import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'

const MyHabits = () => {
    const navigate = useNavigate()

    const goTo = () => { navigate('/myhabits/details') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['plus']} title={'My Habits'} plusOnclick={() => console.log('plus clicked')}/>
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                <div>My Habits Page</div>
                <button className='secondary-gray-button' onClick={goTo}>Details page </button>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default MyHabits
