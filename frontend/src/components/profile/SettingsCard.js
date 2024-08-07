import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'

const SettingsCard = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [appTheme, setAppTheme] = useState('default')
    const [dayStartTime, setDayStartTime] = useState('00:00')

    // useEffect(() => {
    //     const getUserSettings = async () => {
    //         fetch('http://127.0.0.1:5000/api/users/me/settings', { credentials: 'include' })
    //             .then((res) => {
    //                 if (res.status === 200 && res.ok) {
    //                     res.json()
    //                         .then((data) => {
    //                             setAppTheme(data.theme)
    //                             setDayStartTime(data.time_day_starts)
    //                         })
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log(e.message)
    //             })
    //     }

    //     getUserSettings();
    // }, [])

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
                    defaultValue={themeOptions.filter(item => (item.value === appTheme))}
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
                    defaultValue={timeOptions.filter(item => (item.value === dayStartTime))}
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
