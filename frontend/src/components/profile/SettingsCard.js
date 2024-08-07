import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const classNames = x => x;

const SettingsCard = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [appTheme, setAppTheme] = useState({ value: 'default', label: 'Default' })
    const [dayStartTime, setDayStartTime] = useState({ value: '00:00', label: '00:00' })

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
                        toast('User info updated successfully!')
                        setIsEdit(false)
                    } else {
                        toast('Error updating user info.')
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
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                closeButton={({ closeToast }) => (
                    <FontAwesomeIcon icon={faCircleXmark} className='p-1 text-appGray-3' onClick={closeToast} />
                )}
                icon={<FontAwesomeIcon icon={faCircleCheck} className='text-appGreen text-xl' />}
                toastClassName={() =>
                    classNames('border border-appGreen bg-appWhite text-appBlack flex flex-row p-2 rounded-2xl m-3')
                }
            />
        </div>
    )
}

export default SettingsCard
