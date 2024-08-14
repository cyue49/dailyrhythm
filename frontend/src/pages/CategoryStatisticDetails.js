import React from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'

const CategoryStatisticDetails = () => {
    // habit passed from route state
    const { state: { category, totalCheckins } = {} } = useLocation();

    const navigate = useNavigate()

    const navigateBack = () => { navigate('/mystatistics') }
    return (
        <div className='h-screen w-screen flex flex-col items-center bg-webBgColor text-primaryTextColor'>
            <TopBar icons={['back']} title={category.category_name} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-subBgColor no-scrollbar overflow-y-auto flex flex-col gap-3 py-3 pb-8 my-[56px] px-3 lg:px-5'>
                <div className='font-bold text-2xl w-full px-3 pb-2 border-b border-primaryColor'>{category.category_name}</div>

                {/* basic statistics */}
                {/* <BasicStatistics habit={habit} totalCheckins={totalCheckins} /> */}

                {/* habit detail */}
                {/* <HabitDetailsCard habit={habit} /> */}

                {/* past week checkin statistics */}
                {/* <PastWeekStatistics habit={habit} /> */}

                {/* current month checkin statistics */}
                {/* <CurrentMonthStatistics habit={habit} /> */}
            </div>
            <BottomBar current={1} />
        </div>
    )
}

export default CategoryStatisticDetails
