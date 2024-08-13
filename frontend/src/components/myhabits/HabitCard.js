import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../utils/DateUtils'
import { getDayCount, getTotalCount, incrementCheckin } from '../../services/CheckinServices'

const HabitCard = ({ habit, currentDay, selectedCheckOption }) => {
    // states for habit checkin counts
    const [dailyCount, setDailyCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    // fetch daily checkin count
    useEffect(() => {
        const today = formatDate(currentDay)
        getDayCount(habit.habit_id, today)
            .then(response => setDailyCount(response))
    }, [currentDay, habit.habit_id]);

    // fetch total checkin count
    useEffect(() => {
        getTotalCount(habit.habit_id)
            .then(response => setTotalCount(response))
    }, [habit.habit_id]);

    // handle clicking on daily count circle to increment checkin count
    const handleClick = () => {
        const data = JSON.stringify({
            for_date: formatDate(currentDay),
            habit_id: habit.habit_id
        })
        incrementCheckin(data)
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCount + 1)
                    setTotalCount(totalCount + 1)
                }
            })
    }

    const navigate = useNavigate()

    // navigate to habit details page
    const handleNavigate = () => {
        navigate('/myhabits/details', {
            state: { currentDay: currentDay, habit: habit }
        })
    }

    return (
        <div className={`w-full flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full bg-appVariant-1 ${(selectedCheckOption.value === 'check' && dailyCount === 0) ? 'hidden' : ''} ${(selectedCheckOption.value === 'nocheck' && dailyCount !== 0) ? 'hidden' : ''}`}>
            <div className='rounded-full border border-appPrimaryColor bg-appPrimaryLight hover:bg-appPrimaryColor hover:text-appPrimaryLight cursor-pointer button-animation px-3 py-1' onClick={handleClick}>{dailyCount}</div>
            <div className='flex-1 truncate cursor-pointer' onClick={handleNavigate}>{habit.habit_name}</div>
            <div className='text-xs text-appVariant-3 pr-2 font-bold'>Total: {totalCount}</div>
        </div>
    )
}

export default HabitCard