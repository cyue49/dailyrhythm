import React from 'react'
import Select from 'react-select'
import { selectStyles } from '../../assets/data/selectOptions'
import { Checkbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const FilterDialog = ({ setDialogOpen, categoryOptions, selectedCategory, setSelectedCategory, showTodayOnly, setShowTodayOnly, selectedCheckOption, setSelectedCheckOption }) => {
    const checkOptions = [{ value: 'all', label: 'All' }, { value: 'check', label: 'Checked-in' }, { value: 'nocheck', label: 'Not checked-in' }]

    return (
        <div className='flex flex-col items-start justify-center gap-2 w-full border-t border-primaryColor py-4 text-primaryTextColor'>
            {/* category selection */}
            <div className='font-bold text-sm'>Category: </div>
            <Select
                className='w-full'
                styles={selectStyles}
                value={selectedCategory}
                isClearable={false}
                isSearchable={false}
                onChange={e => setSelectedCategory(e)}
                options={categoryOptions} />

            {/* checked in or not selection */}
            <div className='font-bold text-sm'>Check-in Status: </div>
            <Select
                className='w-full'
                styles={selectStyles}
                value={selectedCheckOption}
                isClearable={false}
                isSearchable={false}
                onChange={e => setSelectedCheckOption(e)}
                options={checkOptions} />

            {/* today only option */}
            <div className='font-bold text-sm'>Options: </div>
            <div className='flex flex-row gap-3'>
                <Checkbox checked={showTodayOnly} onChange={setShowTodayOnly} className="rounded-md border border-primaryColor size-5 overflow-hidden">
                    {showTodayOnly ?
                        <div className='size-5 bg-primaryColor text-secondaryTextColor center-of-div flex-col text-sm'><FontAwesomeIcon icon={faCheck} /></div>
                        : <div className='hidden'></div>}
                </Checkbox>
                <div>Show for today only</div>
            </div>

            {/* close button */}
            <div className='secondary-neutral-button hover:primary-neutral-button button-animation w-full center-of-div mt-4' onClick={() => setDialogOpen(false)}>Done</div>
        </div >
    )
}

export default FilterDialog
