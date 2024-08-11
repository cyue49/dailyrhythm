import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectStyles } from '../../assets/data/selectOptions'
import { getCategories } from '../../services/CategoryServices'

const CategoryForm = ({ category, setCategory }) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const categoryOptions = []

        getCategories()
            .then(response => {
                response.forEach(element => {
                    const option = { value: element.category_id, label: element.category_name }
                    categoryOptions.push(option)
                });
                setOptions(categoryOptions)
            })
    }, [])

    return (
        <div className='flex flex-col gap-1'>
            <div className='font-bold'>Category <span className='text-appRed'>*</span> : </div>
            <Select
                styles={selectStyles}
                value={category}
                isClearable={false}
                isSearchable={false}
                onChange={e => setCategory(e)}
                options={options} />
        </div>
    )
}

export default CategoryForm
