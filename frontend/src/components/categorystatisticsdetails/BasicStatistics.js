import React, { useState, useEffect } from 'react'
import { getTotalCategoryCheckinDays } from '../../services/CheckinServices';

const BasicStatistics = ({ category, totalCheckins }) => {
    const [daysCount, setDaysCount] = useState(0)

    // fetch total checkin count
    useEffect(() => {
        getTotalCategoryCheckinDays(category.category_id)
            .then(response => setDaysCount(response))
    }, [category.category_id]);

    return (
        <div className='flex flex-col items-start justify-center bg-subCardColor rounded-3xl p-3 pb-4 gap-2 text-primaryTextColor'>
            {/* total checkin & days checked-in */}
            <div className='flex flex-row justify-around w-full'>
                <div className='center-of-div flex-col gap-2 border-2 border-primaryColor bg-mainBgColor rounded-3xl p-3 w-5/12 h-36'>
                    <div className='text-5xl font-bold text-primaryColor text-center'>{totalCheckins}</div>
                    <div className='font-bold text-primaryColor text-center'>Total check-in counts</div>
                </div>
                <div className='center-of-div flex-col gap-2 border-2 border-primaryColor bg-mainBgColor rounded-3xl p-3 w-5/12 h-36'>
                    <div className='text-5xl font-bold text-primaryColor text-center'>{daysCount}</div>
                    <div className='font-bold text-primaryColor text-center'>Total days checked-in</div>
                </div>
            </div>
        </div>
    )
}

export default BasicStatistics
