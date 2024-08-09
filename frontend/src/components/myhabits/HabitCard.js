import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const HabitCard = ({ habit, currentDay }) => {
    // states for habit checkin counts
    const [dailyCount, setDailyCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    // fetch daily checkin count
    const getDailyCheckins = useCallback(() => {
        // get current date in yyyy-mm-dd format
        const offset = currentDay.getTimezoneOffset()
        const newDay = new Date(currentDay.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0]

        // fetch single day checkin count
        fetch(`http://127.0.0.1:5000/api/custom_habits_checkins/habit/${habit.habit_id}/count/day/${newDay}`, { credentials: 'include' })
            .then((res) => {
                if (res.status === 200 && res.ok) {
                    res.json()
                        .then((data) => {
                            setDailyCount(parseInt(data.count))
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
                            setTotalCount(parseInt(data.count))
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

    const handleClick = async () => {
        const formattedDate = new Date(currentDay.getTime() - (currentDay.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
        fetch('http://127.0.0.1:5000/api/custom_habits_checkins/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    for_date: formattedDate,
                    habit_id: habit.habit_id
                })
            }
        ).then((res) => {
            if (res.status === 200 && res.ok) {
                // update counts
                setDailyCount(dailyCount + 1)
                setTotalCount(totalCount + 1)
            } else if (res.status === 400) {
                console.log('error')
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }

    const navigate = useNavigate()

    // navigate to habit details page
    const handleNavigate = () => {
        navigate('/myhabits/details', {
            state: { habit: habit }
        })
    }

    return (
        <div className='w-full flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full cursor-pointer bg-appGray-1' onClick={handleNavigate}>
            <div className='rounded-full border border-appGreen bg-appWhite hover:bg-appGreen hover:text-appWhite cursor-pointer button-animation px-3 py-1' onClick={handleClick}>{dailyCount}</div>
            <div className='flex-1 truncate'>{habit.habit_name}</div>
            <div className='text-xs text-appGray-3 pr-2 font-bold'>Total: {totalCount}</div>
        </div>
    )
}

export default HabitCard