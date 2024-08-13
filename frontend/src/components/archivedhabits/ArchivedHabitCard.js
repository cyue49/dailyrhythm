import React, { useState, useEffect } from 'react'
import { getTotalCount } from '../../services/CheckinServices'
import { Checkbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const ArchivedHabitCard = ({ habit, archivedHabits, setArchivedHabits, deselectAll, selectAll }) => {
    const [totalCount, setTotalCount] = useState(0)
    const [checked, setChecked] = useState(false)

    // fetch total checkin count
    useEffect(() => {
        getTotalCount(habit.habit_id)
            .then(response => setTotalCount(response))
    }, [habit.habit_id]);

    // deselect checkbox if user chose deselect all
    useEffect(() => {
        if (deselectAll) setChecked(false)
    }, [deselectAll]);

    // select checkbox if user chose deselect all
    useEffect(() => {
        if (selectAll) setChecked(true)
    }, [selectAll]);

    // handle check
    const handleCheck = () => {
        setChecked(!checked)
        setArchivedHabits(archivedHabits.map(item => (item.habit_id === habit.habit_id) ? { habit_id: item.habit_id, habit_name: item.habit_name, selected: !item.selected } : item))
    }

    return (
        <div className='w-full center-of-div flex-row gap-2'>
            <Checkbox checked={checked} onChange={handleCheck} className="rounded-md border border-appPrimaryColor size-5 overflow-hidden">
                {checked ?
                    <div className='size-5 bg-appPrimaryColor text-appPrimaryLight center-of-div flex-col text-sm'><FontAwesomeIcon icon={faCheck} /></div>
                    : <div></div>}
            </Checkbox>
            <div className='flex-1 flex flex-row flex-nowrap items-center justify-between px-3 py-2 gap-4 rounded-full bg-appVariant-1'>
                <div className='flex-1 truncate cursor-pointer'>{habit.habit_name}</div>
                <div className='text-xs text-appVariant-3 pr-2 font-bold'>Total: {totalCount}</div>
            </div>
        </div>

    )
}

export default ArchivedHabitCard
