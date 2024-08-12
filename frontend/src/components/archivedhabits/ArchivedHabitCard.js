import React, { useState, useEffect } from 'react'
import { getTotalCount } from '../../services/CheckinServices'
import { Checkbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const ArchivedHabitCard = ({ habit, selectedHabits, setSelectedHabits }) => {
    const [totalCount, setTotalCount] = useState(0)
    const [checked, setChecked] = useState(false)

    // fetch total checkin count
    useEffect(() => {
        getTotalCount(habit.habit_id)
            .then(response => setTotalCount(response))
    }, [habit.habit_id]);

    // handle check
    const handleCheck = () => {
        setChecked(!checked)
        if (!selectedHabits.includes(habit.habit_id)) {
            setSelectedHabits([...selectedHabits, habit.habit_id])
        } else {
            setSelectedHabits(selectedHabits.filter(item => item !== habit.habit_id))
        }
        console.log(selectedHabits)
    }

    return (
        <div className='w-full center-of-div flex-row gap-2'>
            <Checkbox checked={checked} onChange={handleCheck} className="rounded-md border border-appGreen size-5 overflow-hidden">
                {checked ?
                    <div className='size-5 bg-appGreen text-appWhite center-of-div flex-col text-sm'><FontAwesomeIcon icon={faCheck} /></div>
                    : <div></div>}
            </Checkbox>
            <div className='flex-1 flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full bg-appGray-1'>
                <div className='flex-1 truncate cursor-pointer'>{habit.habit_name}</div>
                <div className='text-xs text-appGray-3 pr-2 font-bold'>Total: {totalCount}</div>
            </div>
        </div>

    )
}

export default ArchivedHabitCard
