import React, { useState, useEffect } from 'react'
import { formatDate, formatDateMonthStart } from '../../utils/DateUtils'
import { getCountBetween } from '../../services/CheckinServices'

const CurrentMonthStatistics = ({ habit }) => {
    const [monthlyCount, setMonthlyCount] = useState(0)

    // fetch monthly checkin count
    useEffect(() => {
        const today = formatDate(new Date())
        const monthStart = formatDateMonthStart(today)
        getCountBetween(habit.habit_id, monthStart, today)
            .then(response => setMonthlyCount(response))
    }, [habit.habit_id]);

    return (
        <div className='flex flex-col items-start justify-center bg-appGray-1 rounded-3xl px-5 py-3 gap-2'>
            <div className='font-bold'>Current Month Check-ins: </div>
            <div>todo</div>
            <div className='flex flex-row py-2 items-center justify-start'>
                <div className='font-bold text-sm'>Total check-ins this month: </div>
                <div className='font-bold text-appGreen text-lg center-of-div px-3 py-1'>{monthlyCount}</div>
            </div>
        </div>
    )
}

export default CurrentMonthStatistics
