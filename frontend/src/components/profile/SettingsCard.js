import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'

const SettingsCard = () => {
    const [isEdit, setIsEdit] = useState(false)

    const selectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isDisabled ? '#858585' : '#528E6C',
            borderRadius: '25px'
        }),
        option: (baseStyles, { isSelected }) => ({
            ...baseStyles,
            backgroundColor: isSelected ? '#528E6C' : 'white'
        })
    }

    const handleEdit = () => {
        if (isEdit) {
            // handle request to db
            console.log('saving to db')
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-3 p-5 bg-appGray-1 rounded-3xl'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <span className='font-bold text-lg'>Settings</span>
                    <FontAwesomeIcon icon={isEdit ? faCircleCheck : faPenToSquare} className='text-2xl text-appGreen' onClick={handleEdit} />
                </div>

                <div className='font-bold'>App theme:</div>
                <Select
                    styles={selectStyles}
                    defaultValue={themeOptions[0]}
                    isClearable={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    isDisabled={!isEdit}
                    options={themeOptions} />

                <div className='font-bold'>Start time for a day:</div>
                <Select
                    styles={selectStyles}
                    defaultValue={timeOptions[0]}
                    isClearable={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    isDisabled={!isEdit}
                    options={timeOptions} />
            </div>
        </div>
    )
}

export default SettingsCard
