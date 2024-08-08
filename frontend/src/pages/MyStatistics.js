import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'

const MyStatistics = () => {
    const navigate = useNavigate()

    const goTo = () => { navigate('/mystatistics/details') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={[]} title={'My Statistics'} />
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                <div>My Statistics Page</div>
                <button className='secondary-gray-button' onClick={goTo}>Details page </button>
            </div>
            <BottomBar current={1} />
        </div>
    )
}

export default MyStatistics
