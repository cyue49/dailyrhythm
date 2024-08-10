import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDateMonthStart, formatDateWeekAgo } from '../../utils/DateUtils'
import { getCountBetween, getDayCount, getTotalCount, incrementCheckin } from '../../services/CheckinServices'

const HabitCard = ({ habit, currentDay }) => {
    // states for habit checkin counts
    const [dailyCount, setDailyCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [monthlyCount, setMonthlyCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    // fetch daily checkin count
    const getDailyCheckins = useCallback(() => {
        const today = formatDate(currentDay)
        getDayCount(habit.habit_id, today)
            .then(response => setDailyCount(response))
    }, [currentDay, habit.habit_id]);

    useEffect(() => {
        getDailyCheckins()
    }, [getDailyCheckins]);

    // fetch weekly checkin count
    const getWeeklyCheckins = useCallback(() => {
        const today = formatDate(new Date())
        const weekAgo = formatDateWeekAgo(currentDay)
        getCountBetween(habit.habit_id, weekAgo, today)
            .then(response => setWeeklyCount(response))
    }, [currentDay, habit.habit_id]);

    useEffect(() => {
        getWeeklyCheckins()
    }, [getWeeklyCheckins]);

    // fetch monthly checkin count
    const getMonthlyCheckins = useCallback(() => {
        const today = formatDate(new Date())
        const monthStart = formatDateMonthStart(currentDay)
        getCountBetween(habit.habit_id, monthStart, today)
            .then(response => setMonthlyCount(response))
    }, [currentDay, habit.habit_id]);

    useEffect(() => {
        getMonthlyCheckins()
    }, [getMonthlyCheckins]);

    // fetch total checkin count
    const getTotalCheckins = useCallback(() => {
        getTotalCount(habit.habit_id)
            .then(response => setTotalCount(response))
    }, [habit.habit_id]);

    useEffect(() => {
        getTotalCheckins()
    }, [getTotalCheckins]);

    // handle clicking on daily count circle to increment checkin count
    const handleClick = async () => {
        const data = JSON.stringify({
            for_date: formatDate(currentDay),
            habit_id: habit.habit_id
        })
        incrementCheckin(data)
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCount + 1)
                    setWeeklyCount(weeklyCount + 1)
                    setMonthlyCount(monthlyCount + 1)
                    setTotalCount(totalCount + 1)
                }
            })
    }

    const navigate = useNavigate()

    // navigate to habit details page
    const handleNavigate = () => {
        navigate('/myhabits/details', {
            state: { habit: habit, dailyCount: dailyCount, weeklyCount: weeklyCount, monthlyCount: monthlyCount, totalCount: totalCount }
        })
    }

    return (
        <div className='w-full flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full bg-appGray-1'>
            <div className='rounded-full border border-appGreen bg-appWhite hover:bg-appGreen hover:text-appWhite cursor-pointer button-animation px-3 py-1' onClick={handleClick}>{dailyCount}</div>
            <div className='flex-1 truncate cursor-pointer' onClick={handleNavigate}>{habit.habit_name}</div>
            <div className='text-xs text-appGray-3 pr-2 font-bold'>Total: {totalCount}</div>
        </div>
    )
}

export default HabitCard