import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'
import Toast from '../common/Toast'

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
        const getUserSettings = async () => {
            fetch('http://127.0.0.1:5000/api/users/me/settings', { credentials: 'include' })
                .then((res) => {
                    if (res.status === 200 && res.ok) {
                        res.json()
                            .then((data) => {
                                // setAppTheme(data.theme)
                                setAppTheme(themeOptions.find(item => (item.value === data.theme)))
                                setDayStartTime(timeOptions.find(item => (item.value === data.time_day_starts.slice(0, 5))))
                            })
                    }
                })
                .catch((e) => {
                    console.log(e.message)
                })
        }

        getUserSettings();
    }, [])

    // styles of selection boxes
    const selectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isDisabled ? '#858585' : '#528E6C',
            borderRadius: '25px'
        }),
        option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...baseStyles,
            backgroundColor: isFocused ? '#528E6C' : 'white',
            color: isFocused ? '#F3F3F3' : '#353535'
        })
    }

    // update user settings in db
    const handleEdit = () => {
        if (isEdit) {
            fetch(' http://127.0.0.1:5000/api/users/me/edit/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    theme: appTheme.value,
                    time_day_starts: dayStartTime.value
                })
            })
                .then((res) => {
                    if (res.status === 200 && res.ok) {
                        toast('User settings updated successfully!')
                        setIsEdit(false)
                    } else {
                        toast('Error updating user settings.')
                    }
                })
                .catch((e) => {
                    console.log(e.message)
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
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    isDisabled={!isEdit}
                    onChange={e => setAppTheme(e)}
                    options={themeOptions} />

                <div className='font-bold'>Start time for a day:</div>
                <Select
                    styles={selectStyles}
                    value={dayStartTime}
                    isClearable={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    isDisabled={!isEdit}
                    onChange={e => setDayStartTime(e)}
                    options={timeOptions} />
            </div>
            <Toast icon={faCircleCheck} message={message} isVisible={isVisible} />
        </div>
    )
}

export default SettingsCard
