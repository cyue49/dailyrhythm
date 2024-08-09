import React, { useState, useEffect, useCallback } from 'react'

const HabitCard = ({ habit, currentDay }) => {
    const [dailyCount, setDailyCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    // fetch daily checkin count
    const getDailyCheckins = useCallback(() => {
        // get current date in yyyy-mm-dd format
        const offset = currentDay.getTimezoneOffset()
        const newDay = new Date(currentDay.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0]

        // fetch count
        fetch(`http://127.0.0.1:5000/api/custom_habits_checkins/habit/${habit.habit_id}/count/day/${newDay}`, { credentials: 'include' })
            .then((res) => {
                if (res.status === 200 && res.ok) {
                    res.json()
                        .then((data) => {
                            setDailyCount(data.count)
                        })
                }
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [currentDay, habit.habit_id]);

    useEffect(() => {
        getDailyCheckins()
    }, [getDailyCheckins]);

    // fetch total checkin count
    const getTotalCheckins = useCallback(() => {
        // fetch count
        fetch(`http://127.0.0.1:5000/api/custom_habits_checkins/habit/${habit.habit_id}/count`, { credentials: 'include' })
            .then((res) => {
                if (res.status === 200 && res.ok) {
                    res.json()
                        .then((data) => {
                            setTotalCount(data.count)
                        })
                }
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [habit.habit_id]);

    useEffect(() => {
        getTotalCheckins()
    }, [getTotalCheckins]);

    return (
        <div className='w-full flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full cursor-pointer bg-appGray-1'>
            <div className='rounded-full border border-appGreen bg-appWhite hover:bg-appGreen hover:text-appWhite cursor-pointer button-animation px-3 py-1'>{dailyCount}</div>
            <div className='flex-1 truncate'>{habit.habit_name}</div>
            <div className='text-xs text-appGray-3 pr-2 font-bold'>Total: {totalCount}</div>
        </div>
    )
}

export default HabitCard