import React from 'react'
import { addCategory, renameCategory } from '../../services/CategoryServices'

const CategoryDialog = ({ categoryID, categoryName, setCategoryName, setDialogOpen, mode, setCategoryState }) => {
    // handle adding/updating a category
    const handleDone = () => {
        if (categoryName !== '') {
            const data = JSON.stringify({
                category_name: categoryName
            })
            if (mode === 'add') {
                addCategory(data)
                    .then(response => {
                        if (response === 1) {
                            setCategoryName('')
                            setDialogOpen(false)
                        }
                    })
            } else if (mode === 'rename') {
                renameCategory(categoryID, data)
                    .then(response => {
                        if (response === 1) {
                            setCategoryName('')
                            setCategoryState(categoryName)
                            setDialogOpen(false)
                        }
                    })
            }

        }
    }

    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='font-bold'>Category name: </div>
            <input className='form-text-input w-full' type='text' name='category_name' id='category_name' maxLength='50' value={categoryName} onChange={e => setCategoryName(e.target.value)} />
            <div className='center-of-div flex-row gap-2 mt-2'>
                <div className='primary-gray-button flex-1 center-of-div'
                    onClick={() => {
                        setCategoryName('')
                        setDialogOpen(false)
                    }}>Cancel</div>
                <div className='primary-green-button flex-1 center-of-div' onClick={handleDone}>Done</div>
            </div>
        </div>
    )
}

export default CategoryDialog
