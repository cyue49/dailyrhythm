import React, { useState } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/DateUtils'
import { incrementCheckin, removeCheckin } from '../services/CheckinServices'
import HabitTitleCard from '../components/habitsdetails/HabitTitleCard'
import CheckinDetailsCard from '../components/habitsdetails/CheckinDetailsCard'
import HabitDetailsCard from '../components/habitsdetails/HabitDetailsCard'
import { Dialog, DialogPanel } from '@headlessui/react'
import { archiveHabit, deleteHabit } from '../services/HabitServices'

const HabitDetails = () => {
    // habit passed from route state
    const { state: { currentDay, habit } = {} } = useLocation();

    // states for habit checkin counts
    const [dailyCount, setDailyCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [monthlyCount, setMonthlyCount] = useState(0)

    // state for options dialog
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    // navigate back to habits home page
    const navigateBack = () => { navigate('/myhabits') }

    // navigate to edit habit page
    const navigateTo = () => {
        navigate('/myhabits/form', {
            state: { currentDay: currentDay, mode: 'Edit', habit: habit }
        })
    }

    // handle user clicking on check-in
    const handleCheckin = () => {
        const data = JSON.stringify({
            for_date: formatDate(currentDay),
            habit_id: habit.habit_id
        })
        incrementCheckin(data)
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCount + 1)
                    setWeeklyCount(weeklyCount + 1)
                    setTotalCount(totalCount + 1)
                }
            })
    }

    // handle user clicking on uncheck-in
    const handleUncheckin = () => {
        if (dailyCount === 0) return
        removeCheckin(habit.habit_id, formatDate(currentDay))
            .then(response => {
                if (response === 1) {
                    setDailyCount(dailyCount - 1)
                    setWeeklyCount(weeklyCount - 1)
                    setTotalCount(totalCount - 1)
                }
            })
    }

    // handle archiving a habit
    const handleArchive = () => {
        const data = JSON.stringify({
            is_active: false
        })
        archiveHabit(habit.habit_id, data)
            .then(response => {
                if (response === 1) {
                    setDialogOpen(false)
                    navigateBack()
                }
            })
    }

    // handle deleting a habit
    const handleDelete = () => {
        deleteHabit(habit.habit_id)
            .then(response => {
                if (response === 1) {
                    setDialogOpen(false)
                    navigateBack()
                }
            })
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back', 'ellipsis']} title={habit.habit_name} backOnclick={navigateBack} ellipsisOnClick={(() => setDialogOpen(true))} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 pt-3 mt-[56px] px-3 lg:px-5'>
                <HabitTitleCard currentDay={currentDay} habit={habit} dailyCount={dailyCount} setDailyCount={setDailyCount} totalCount={totalCount} setTotalCount={setTotalCount} />

                <CheckinDetailsCard currentDay={currentDay} habit={habit} weeklyCount={weeklyCount} setWeeklyCount={setWeeklyCount} monthlyCount={monthlyCount} setMonthlyCount={setMonthlyCount} dailyCount={dailyCount} />

                <HabitDetailsCard habit={habit} />

                <div className='center-of-div flex-row gap-3'>
                    <div className='secondary-red-button hover:primary-red-button button-animation flex-1 center-of-div' onClick={handleUncheckin}>Uncheck-in</div>
                    <div className='secondary-green-button hover:primary-green-button button-animation flex-1 center-of-div' onClick={handleCheckin}>Check-in</div>
                </div>
            </div>
            <BottomBar current={2} />

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50">
                <div className="fixed inset-0 w-screen center-of-div bg-appBlack bg-opacity-80 p-4">
                    <DialogPanel className="w-7/12 max-w-xs center-of-div flex-col bg-appWhite rounded-3xl border border-appGreen overflow-hidden">
                        <div className='w-full p-3 center-of-div hover:bg-appGreen hover:text-appWhite button-animation' onClick={navigateTo}>Edit</div>
                        <div className='w-full p-3 center-of-div hover:bg-appGreen hover:text-appWhite button-animation' onClick={handleArchive}>Archive</div>
                        <div className='w-full p-3 center-of-div hover:bg-appGreen hover:text-appWhite button-animation' onClick={handleDelete}>Delete</div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default HabitDetails
