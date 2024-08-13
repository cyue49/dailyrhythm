import React, { useState, useEffect } from 'react'
import HabitCard from './HabitCard'
import { getHabitsForCategory } from '../../services/HabitServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { DialogTitle, Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import RenameCategoryDialog from './RenameCategoryDialog'
import { deleteCategory } from '../../services/CategoryServices'

const CategoryDivider = ({ category, currentDay, categories, setCategories, showTodayOnly, selectedCheckOption }) => {
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

    // update category name when it changes (ex.: after deleting a category ordered previous to this one)
    useEffect(() => {
        setCategoryName(category.category_name)
    }, [category.category_name])

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
                    setConfirmDelete(false)
                }
            })
    }

    return (
        <div className='center-of-div flex-col flex-nowrap w-full gap-1'>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center gap-3'>
                <Popover>
                    <PopoverButton><FontAwesomeIcon className='text-appPrimaryColor cursor-pointer' icon={faPenToSquare} /></PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="right"
                        className='bg-appPrimaryLight border border-appPrimaryColor rounded-2xl m-2 w-[150px] flex flex-col overflow-hidden transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
                        <div className='px-4 pt-2 pb-1 center-of-div text-appPrimaryDark hover:bg-appPrimaryColor hover:text-appPrimaryLight button-animation cursor-pointer border-b border-appVariant-2' onClick={() => setDialogOpen(true)}>Rename</div>
                        <div className='px-4 pt-1 pb-2 center-of-div text-appPrimaryDark hover:bg-appPrimaryColor hover:text-appPrimaryLight button-animation cursor-pointer' onClick={() => setConfirmDelete(true)}>Delete</div>
                    </PopoverPanel>
                </Popover>
                <div className='text-appPrimaryColor font-bold'>{categoryName}</div>
                <div className='center-of-div h-[1px] bg-appPrimaryColor flex-1'> </div>
                <div className='text-appPrimaryColor font-bold'>{habits.length}</div>
            </div>
            {habits.map((habit, index) => (
                showTodayOnly && !habit.weekdays.includes(currentDay.getDay().toString()) ?
                    <div className='hidden' key={index}></div>
                    : <HabitCard habit={habit} currentDay={currentDay} key={index} selectedCheckOption={selectedCheckOption} />
            ))}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50 text-appPrimaryDark">
                <div className="fixed inset-0 w-screen center-of-div bg-appPrimaryDark/80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-appPrimaryLight rounded-3xl border border-appPrimaryColor p-4">
                        <RenameCategoryDialog categoryID={category.category_id} categoryName={categoryRename} setCategoryName={setCategoryRename} setDialogOpen={setDialogOpen} setCategoryState={setCategoryName} />
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} className="relative z-50 text-appPrimaryDark">
                <div className="fixed inset-0 w-screen center-of-div bg-appPrimaryDark/80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-appPrimaryLight rounded-3xl border border-appPrimaryColor p-4">
                        <DialogTitle className='font-bold'>Are you sure you want to delete this category?</DialogTitle>
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

export default CategoryDivider
