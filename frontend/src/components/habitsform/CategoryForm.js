import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectStyles } from '../../assets/data/selectOptions'
import { getCategories } from '../../services/CategoryServices'
import { Dialog, DialogPanel } from '@headlessui/react'
import NewCategoryDialog from '../habitsform/NewCategoryDialog'

const CategoryForm = ({ category, setCategory, categoryID }) => {
    const [options, setOptions] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newCategory, setNewCategory] = useState('')

    // getting all of user's categories
    useEffect(() => {
        const categoryOptions = []
        var defaultOption = {value: '', label: 'Select'}

        getCategories()
            .then(response => {
                response.forEach(element => {
                    const option = { value: element.category_id, label: element.category_name }
                    if (element.category_id === categoryID) defaultOption = option 
                    categoryOptions.push(option)
                });
                setOptions(categoryOptions)
                setCategory(defaultOption)
            })
    }, [categoryID, setCategory])

    return (
        <div className='flex flex-col gap-1 rounded-3xl p-3 bg-appGray-1'>
            <div className='font-bold'>Category <span className='text-appRed'>*</span> : </div>
            {options.length !== 0 ?
                <Select
                    styles={selectStyles}
                    value={category}
                    isClearable={false}
                    isSearchable={false}
                    onChange={e => setCategory(e)}
                    options={options} />
                :
                <div></div>
            }
            <div className='secondary-green-button hover:primary-green-button button-animation w-full center-of-div mt-1' onClick={() => setDialogOpen(true)}>Add a category</div>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50">
                <div className="fixed inset-0 w-screen center-of-div bg-appBlack bg-opacity-80 p-4">
                    <DialogPanel className="w-10/12 max-w-sm center-of-div flex-col bg-appWhite rounded-3xl border border-appGreen p-4">
                        <NewCategoryDialog categoryName={newCategory} setCategoryName={setNewCategory} setDialogOpen={setDialogOpen} categoryOptions={options} setCategoryOptions={setOptions} setCurrentOption={setCategory} />
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default CategoryForm
