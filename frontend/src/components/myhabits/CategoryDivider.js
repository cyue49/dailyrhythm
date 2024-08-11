import React, { useState, useEffect } from 'react'
import HabitCard from './HabitCard'
import { getHabitsForCategory } from '../../services/HabitServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Dialog, DialogPanel } from '@headlessui/react'
import CategoryDialog from '../myhabits/CategoryDialog'
import { deleteCategory } from '../../services/CategoryServices'

const CategoryDivider = ({ category, currentDay }) => {
    const [habits, setHabits] = useState([])
    const [categoryName, setCategoryName] = useState(category.category_name)
    const [categoryRename, setCategoryRename] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    // fetch all user habits for this category
    useEffect(() => {
        getHabitsForCategory(category.category_id)
            .then(response => {
                setHabits(response)
            })
    }, [category.category_id]);

    // handle delete
    const handleDelete = () => {
        deleteCategory(category.category_id)
            .then(response => {
                if (response === 1) {
                    // todo
                }
            })
    }

    return (
        <div className='center-of-div flex-col flex-nowrap w-full gap-1'>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center gap-3'>
                <Popover>
                    <PopoverButton><FontAwesomeIcon className='text-appGreen cursor-pointer' icon={faPenToSquare} /></PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="right"
                        className='bg-appWhite border border-appGreen rounded-2xl m-2 w-[150px] flex flex-col overflow-hidden transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
                        <div className='px-4 pt-2 pb-1 center-of-div hover:bg-appGreen hover:text-appWhite button-animation cursor-pointer' onClick={() => setDialogOpen(true)}>Rename</div>
                        <div className='px-4 pt-1 pb-2 center-of-div hover:bg-appGreen hover:text-appWhite button-animation cursor-pointer' onClick={handleDelete}>Delete</div>
                    </PopoverPanel>
                </Popover>
                <div className='text-appGreen font-bold'>{categoryName}</div>
                <div className='center-of-div h-[1px] bg-appGreen flex-1'> </div>
                <div className='text-appGreen font-bold'>{habits.length}</div>
            </div>
            {habits.map((habit, index) => (
                <HabitCard habit={habit} currentDay={currentDay} key={index} />
            ))}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50">
                <div className="fixed inset-0 w-screen center-of-div bg-appBlack bg-opacity-80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-appWhite rounded-3xl border border-appGreen p-4">
                        <CategoryDialog categoryID={category.category_id} categoryName={categoryRename} setCategoryName={setCategoryRename} setDialogOpen={setDialogOpen} mode='rename' setCategoryState={setCategoryName} />
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default CategoryDivider
