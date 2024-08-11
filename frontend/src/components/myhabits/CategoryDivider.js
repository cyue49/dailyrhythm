import React, { useState, useEffect } from 'react'
import HabitCard from './HabitCard'
import { getHabitsForCategory } from '../../services/HabitServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { DialogTitle, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Dialog, DialogPanel } from '@headlessui/react'
import RenameCategoryDialog from './RenameCategoryDialog'
import { deleteCategory } from '../../services/CategoryServices'

const CategoryDivider = ({ category, currentDay, categories, setCategories }) => {
    const [habits, setHabits] = useState([])
    const [categoryName, setCategoryName] = useState(category.category_name)
    const [categoryRename, setCategoryRename] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

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
                    const newCategories = []
                    categories.forEach(element => {
                        if (element.category_id !== category.category_id) {
                            newCategories.push(element)
                        }
                    })
                    setCategories(newCategories)
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
                        <div className='px-4 pt-1 pb-2 center-of-div hover:bg-appGreen hover:text-appWhite button-animation cursor-pointer' onClick={() => setConfirmDelete(true)}>Delete</div>
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
                        <RenameCategoryDialog categoryID={category.category_id} categoryName={categoryRename} setCategoryName={setCategoryRename} setDialogOpen={setDialogOpen} setCategoryState={setCategoryName} />
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} className="relative z-50">
                <div className="fixed inset-0 w-screen center-of-div bg-appBlack bg-opacity-80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-appWhite rounded-3xl border border-appGreen p-4">
                        <div className='font-bold'>Are you sure you want to delete this category?</div>
                        <div className='center-of-div flex-row gap-2 mt-4 w-full'>
                            <div className='primary-gray-button hover:secondary-gray-button button-animation flex-1 center-of-div'
                                onClick={() => setConfirmDelete(false)}>Cancel</div>
                            <div className='primary-red-button hover:secondary-red-button button-animation flex-1 center-of-div' onClick={handleDelete}>Delete</div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default CategoryDivider
