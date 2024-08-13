import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'
import { getArchivedHabits } from '../services/HabitServices'
import ArchivedHabitCard from '../components/archivedhabits/ArchivedHabitCard'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '@headlessui/react'
import { updateHabitArchive, deleteHabit } from '../services/HabitServices'

const ArchivedHabits = () => {
    const navigate = useNavigate()

    // archived habits and selected status states
    const [archivedHabits, setArchivedHabits] = useState([])

    // states for confirm dialogs and select/deselect all
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [confirmArchive, setConfirmArchive] = useState(false)
    const [deselectAll, setDeselectAll] = useState(false)
    const [selectAll, setSelectAll] = useState(false)

    // fetch all archived habits for the user
    useEffect(() => {
        getArchivedHabits()
            .then(response => {
                const myHabits = []
                response.forEach(habit => {
                    myHabits.push({ habit_id: habit.habit_id, habit_name: habit.habit_name, selected: false })
                })
                setArchivedHabits(myHabits)
            })
    }, []);

    // handle select / deselect all checkbox
    const handleSelectAll = () => {
        if (selectAll === true) {
            setDeselectAll(true)
            setSelectAll(false)
            setArchivedHabits(archivedHabits.map((item) => (item.selected === true) ? { habit_id: item.habit_id, habit_name: item.habit_name, selected: false } : item))

        } else {
            setDeselectAll(false)
            setSelectAll(true)
            setArchivedHabits(archivedHabits.map((item) => (item.selected === false) ? { habit_id: item.habit_id, habit_name: item.habit_name, selected: true } : item))

        }
    }

    // set is_active to true for all selected habits in archivedHabits
    const unarchiveSelected = async () => {
        const data = JSON.stringify({
            is_active: true
        })
        archivedHabits.forEach(habit => {
            if (habit.selected === true) {
                updateHabitArchive(habit.habit_id, data)
            }
        })
    }

    // unarchive all selected habits
    const handleUnarchive = () => {
        unarchiveSelected()
            .then(() => {
                // update habits and selected states
                setArchivedHabits(archivedHabits.filter(habit => !habit.selected === true))
                setDeselectAll(true)
                setSelectAll(false)
                setConfirmArchive(false)
            })
    }

    // delete all selected habits in archivedHabits
    const deleteSelected = async () => {
        archivedHabits.forEach(habit => {
            if (habit.selected === true) {
                deleteHabit(habit.habit_id)
            }
        })
    }

    // deleted all selected habits
    const handleDelete = () => {
        deleteSelected()
            .then(() => {
                // update habits and selected states
                setArchivedHabits(archivedHabits.filter(habit => !habit.selected === true))
                setDeselectAll(true)
                setSelectAll(false)
                setConfirmDelete(false)
            })

    }

    const navigateBack = () => { navigate('/profile') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-webBgColor text-primaryTextColor'>
            <TopBar icons={['back']} title={'Archived Habits'} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-mainBgColor no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5'>
                {/* Delete/Unarchive button */}
                <div className='center-of-div flex-row gap-3'>
                    <div className='secondary-important-button hover:primary-important-button button-animation flex-1 center-of-div' onClick={() => setConfirmDelete(true)}>Delete</div>
                    <div className='secondary-color-button hover:primary-color-button button-animation flex-1 center-of-div' onClick={() => setConfirmArchive(true)}>Unarchive</div>
                </div>

                {/* select/deselect buttons */}
                <div className='pb-3 cursor-pointer border-b border-variantColor flex flex-row justify-start items-center gap-3' onClick={handleSelectAll}>
                    <Checkbox checked={selectAll} onChange={setSelectAll} className="rounded-md border border-primaryColor size-5 overflow-hidden">
                        {selectAll ?
                            <div className='size-5 bg-primaryColor text-secondaryTextColor center-of-div flex-col text-sm'><FontAwesomeIcon icon={faCheck} /></div>
                            : <div></div>}
                    </Checkbox>
                    <div>Select / Deselect all</div>
                </div>

                {/* list of archived habits */}
                {archivedHabits.map((habit, index) => (
                    <ArchivedHabitCard key={index} habit={habit} archivedHabits={archivedHabits} setArchivedHabits={setArchivedHabits} deselectAll={deselectAll} selectAll={selectAll} />
                ))}
            </div>

            {/* Confirm delete/unarchive dialogs */}
            <Dialog open={confirmArchive} onClose={() => setConfirmArchive(false)} className="relative z-50 text-primaryTextColor">
                <div className="fixed inset-0 w-screen center-of-div bg-webBgColor/80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-mainBgColor rounded-3xl border border-primaryColor p-4">
                        <DialogTitle className='font-bold'>Are you sure you want to unarchive the selected habits?</DialogTitle>
                        <div className='center-of-div flex-row gap-2 mt-4 w-full'>
                            <div className='primary-variant-button hover:secondary-variant-button button-animation flex-1 center-of-div'
                                onClick={() => setConfirmArchive(false)}>Cancel</div>
                            <div className='primary-color-button hover:secondary-color-button button-animation flex-1 center-of-div' onClick={handleUnarchive}>Unarchive</div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} className="relative z-50 text-primaryTextColor">
                <div className="fixed inset-0 w-screen center-of-div bg-webBgColor/80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-mainBgColor rounded-3xl border border-primaryColor p-4">
                        <DialogTitle className='font-bold'>Are you sure you want to delete the selected habits?</DialogTitle>
                        <div className='center-of-div flex-row gap-2 mt-4 w-full'>
                            <div className='primary-variant-button hover:secondary-variant-button button-animation flex-1 center-of-div'
                                onClick={() => setConfirmDelete(false)}>Cancel</div>
                            <div className='primary-important-button hover:secondary-important-button button-animation flex-1 center-of-div' onClick={handleDelete}>Delete</div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <BottomBar current={3} />
        </div>
    )
}

export default ArchivedHabits
