import React, { useState, useEffect } from 'react'
import { getTotalCount } from '../../services/CheckinServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const HabitCard = ({ habit }) => {
    const [totalCount, setTotalCount] = useState(0)

    // fetch total checkin count
    useEffect(() => {
        getTotalCount(habit.habit_id)
            .then(response => setTotalCount(response))
    }, [habit.habit_id]);

    const navigate = useNavigate()
    const navigateTo = () => { navigate('/mystatistics/details', { state: { habit: habit, totalCheckins: totalCount } }) }

    return (
        <div className='w-full flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full bg-mainCardColor' onClick={navigateTo}>
            <div className={`rounded-full border border-primaryColor bg-mainBgColor py-1 ${(totalCount >= 10) ? 'px-2' : 'px-3'}`}>{totalCount}</div>
            <div className='flex-1 truncate cursor-pointer'>{habit.habit_name}</div>
            <div className='text-primaryColor pr-2 font-bold'><FontAwesomeIcon icon={faCaretRight} /></div>
        </div>
    )
}

export default HabitCard
