import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'

const SettingsCard = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [appTheme, setAppTheme] = useState('')
    const [dayStartTime, setDayStartTime] = useState('')

    const selectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isDisabled ? '#858585' : '#528E6C',
            borderRadius: '25px'
        }),
        option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...baseStyles,
            backgroundColor: isFocused ? '#528E6C' : 'white',
            color: isFocused? '#F3F3F3' : '#353535'
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
        console.log(appTheme)
        console.log(dayStartTime)
    }

    return (
        <div>
            <div className='flex flex-col gap-3 p-5 bg-appGray-1 rounded-3xl'>
                <div className='w-full flex flex-row justify-between items-start'>
                    <span className='font-bold text-lg'>Settings</span>
                    <FontAwesomeIcon icon={isEdit ? faCircleCheck : faPenToSquare} className='text-2xl text-appGreen cursor-pointer' onClick={handleEdit} />
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
                    onChange={e => setAppTheme(e.value)}
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
                    onChange={e => setDayStartTime(e.value)}
                    options={timeOptions} />
            </div>
        </div>
    )
}

export default SettingsCard
