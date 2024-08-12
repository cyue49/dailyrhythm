import React from 'react'
import Select from 'react-select'
import { selectStyles } from '../../assets/data/selectOptions'

const FilterDialog = ({ options, selectedCategory, setSelectedCategory }) => {
    return (
        <div>
            <Select
                styles={selectStyles}
                value={selectedCategory}
                isClearable={false}
                isSearchable={false}
                onChange={e => setSelectedCategory(e)}
                options={options} />
        </div>
    )
}

export default FilterDialog
