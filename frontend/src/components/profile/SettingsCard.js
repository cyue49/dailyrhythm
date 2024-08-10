import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'
import Toast from '../common/Toast'
import { getSettings, updateSettings } from '../../services/UserServices'

const SettingsCard = () => {
    // states for editing user settings
    const [isEdit, setIsEdit] = useState(false)
    const [appTheme, setAppTheme] = useState({ value: 'default', label: 'Default' })
    const [dayStartTime, setDayStartTime] = useState({ value: '00:00', label: '00:00' })

    // states for toast message
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('')

    // toast a notif message
    const toast = (mess) => {
        setIsVisible(true);
        setMessage(mess)

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }

    // fetch user settings from db
    useEffect(() => {
        getSettings()
            .then(response => {
                setAppTheme(themeOptions.find(item => (item.value === response.theme)))
                setDayStartTime(timeOptions.find(item => (item.value === response.time_day_starts.slice(0, 5))))
            })
    }, [])

    // styles of selection boxes
    const appGreen = '#528E6C'
    const appGray3 = '#858585'
    const appWhite = '#F3F3F3'
    const appBlack = '#353535'

    const selectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isDisabled ? appGray3 : appGreen,
            borderRadius: '25px'
        }),
        option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...baseStyles,
            backgroundColor: isFocused ? appGreen : 'white',
            color: isFocused ? appWhite : appBlack
        })
    }

    // update user settings in db
    const handleEdit = () => {
        if (isEdit) {
            const data = JSON.stringify({
                theme: appTheme.value,
                time_day_starts: dayStartTime.value
            })
            updateSettings(data)
                .then(response => {
                    if (response === 1) {
                        setIsEdit(false)
                        toast('User settings updated successfully!')
                    } else {
                        toast('Error updating user settings.')
                    }
                })
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
                    value={appTheme}
                    isClearable={false}
                    isSearchable={false}
                    isDisabled={!isEdit}
                    onChange={e => setAppTheme(e)}
                    options={themeOptions} />

                <div className='font-bold'>Start time for a day:</div>
                <Select
                    styles={selectStyles}
                    value={dayStartTime}
                    isClearable={false}
                    isSearchable={false}
                    isDisabled={!isEdit}
                    onChange={e => setDayStartTime(e)}
                    options={timeOptions} />
            </div>
            <Toast isSuccess={!isEdit} message={message} isVisible={isVisible} />
        </div>
    )
}

export default SettingsCard
