import React, { useState } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/DateUtils'
import { incrementCheckin, removeCheckin } from '../services/CheckinServices'
import HabitTitleCard from '../components/habitsdetails/HabitTitleCard'
import CheckinDetailsCard from '../components/habitsdetails/CheckinDetailsCard'
import HabitDetailsCard from '../components/habitsdetails/HabitDetailsCard'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { updateHabitArchive, deleteHabit } from '../services/HabitServices'

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

    // states for confirm archive / delete dialogs
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [confirmArchive, setConfirmArchive] = useState(false)

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
        updateHabitArchive(habit.habit_id, data)
            .then(response => {
                if (response === 1) {
                    setConfirmArchive(false)
                    navigateBack()
                }
            })
    }

    // handle deleting a habit
    const handleDelete = () => {
        deleteHabit(habit.habit_id)
            .then(response => {
                if (response === 1) {
                    setConfirmDelete(false)
                    navigateBack()
                }
            })
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-webBgColor text-primaryTextColor'>
            <TopBar icons={['back', 'ellipsis']} title={habit.habit_name} backOnclick={navigateBack} ellipsisOnClick={(() => setDialogOpen(true))} />
            <div className='w-full max-w-4xl h-screen bg-subBgColor no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5'>
                <HabitTitleCard currentDay={currentDay} habit={habit} dailyCount={dailyCount} setDailyCount={setDailyCount} totalCount={totalCount} setTotalCount={setTotalCount} />

                <CheckinDetailsCard currentDay={currentDay} habit={habit} weeklyCount={weeklyCount} setWeeklyCount={setWeeklyCount} monthlyCount={monthlyCount} setMonthlyCount={setMonthlyCount} dailyCount={dailyCount} />

                <HabitDetailsCard habit={habit} />

                <div className='center-of-div flex-row gap-3'>
                    <div className='secondary-important-button hover:primary-important-button button-animation flex-1 center-of-div' onClick={handleUncheckin}>Uncheck-in</div>
                    <div className='secondary-color-button hover:primary-color-button button-animation flex-1 center-of-div' onClick={handleCheckin}>Check-in</div>
                </div>
            </div>
            <BottomBar current={2} />

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50 text-primaryTextColor">
                <div className="fixed inset-0 w-screen center-of-div bg-webBgColor/80 p-4">
                    <DialogPanel className="w-7/12 max-w-xs center-of-div flex-col bg-mainBgColor rounded-3xl border border-primaryColor overflow-hidden">
                        <div className='w-full p-3 center-of-div hover:bg-primaryColor hover:text-secondaryTextColor button-animation cursor-pointer' onClick={navigateTo}>Edit</div>
                        <div className='w-full p-3 center-of-div hover:bg-primaryColor hover:text-secondaryTextColor button-animation border-t border-t-variantColor border-b border-b-variantColor cursor-pointer' onClick={() => {
                            setDialogOpen(false)
                            setConfirmArchive(true)
                        }}>Archive</div>
                        <div className='w-full p-3 center-of-div hover:bg-primaryColor hover:text-secondaryTextColor button-animation cursor-pointer' onClick={() => {
                            setDialogOpen(false)
                            setConfirmDelete(true)
                        }}>Delete</div>
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={confirmArchive} onClose={() => setConfirmArchive(false)} className="relative z-50 text-primaryTextColor">
                <div className="fixed inset-0 w-screen center-of-div bg-webBgColor/80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-mainBgColor rounded-3xl border border-primaryColor p-4">
                        <DialogTitle className='font-bold'>Are you sure you want to archive this habit?</DialogTitle>
                        <div className='center-of-div flex-row gap-2 mt-4 w-full'>
                            <div className='primary-variant-button hover:secondary-variant-button button-animation flex-1 center-of-div'
                                onClick={() => setConfirmArchive(false)}>Cancel</div>
                            <div className='primary-important-button hover:secondary-important-button button-animation flex-1 center-of-div' onClick={handleArchive}>Archive</div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} className="relative z-50 text-primaryTextColor">
                <div className="fixed inset-0 w-screen center-of-div bg-webBgColor/80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-mainBgColor rounded-3xl border border-primaryColor p-4">
                        <DialogTitle className='font-bold'>Are you sure you want to delete this habit?</DialogTitle>
                        <div className='center-of-div flex-row gap-2 mt-4 w-full'>
                            <div className='primary-variant-button hover:secondary-variant-button button-animation flex-1 center-of-div'
                                onClick={() => setConfirmDelete(false)}>Cancel</div>
                            <div className='primary-important-button hover:secondary-important-button button-animation flex-1 center-of-div' onClick={handleDelete}>Delete</div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default HabitDetails
