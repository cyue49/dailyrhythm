import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { themeOptions, timeOptions } from '../../assets/data/settingsOptions'

const SettingsCard = () => {
    const [isEditSettings, setEditSettings] = useState(false)

    return (
        <div>
            <div className='flex flex-col gap-3 p-5 mx-3 bg-appGray-1 rounded-3xl'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <span className='font-bold text-lg'>Settings</span>
                    <FontAwesomeIcon icon={faPenToSquare} className='text-2xl text-appGreen' />
                </div>

                <div className='font-bold'>App theme:</div>
                <Select
                    defaultValue={themeOptions[0]}
                    isClearable={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    isDisabled={!isEditSettings}
                    options={themeOptions} />

                <div className='font-bold'>Start time for a day:</div>
                <Select
                    defaultValue={timeOptions[0]}
                    isClearable={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={false}
                    isDisabled={!isEditSettings}
                    options={timeOptions} />
            </div>
        </div>
    )
}

export default SettingsCard
