import React from 'react'
import { Checkbox } from '@headlessui/react'
import { weekDaysShort } from '../../utils/DateUtils'

const WeekdaysForm = ({ checkedDays, setCheckedDays }) => {
    // handle checking/unchecking the checkboxes for weekday selection
    const handleCheck = (position) => {
        setCheckedDays(checkedDays.map((day, index) => index === position ? !day : day))
    }

    return (
        <div className='flex flex-col gap-1 rounded-3xl p-3 bg-appPrimaryLight'>
            <div className='font-bold'>Weekdays: </div>
            <div className='flex flex-row items-center justify-evenly'>
                {weekDaysShort.map((day, index) => (
                    <Checkbox
                        key={index}
                        checked={checkedDays[index]}
                        onChange={() => handleCheck(index)}
                        name='weekdays'
                        id={day}
                        value={day}
                        className="rounded-full border border-appPrimaryColor bg-appPrimaryLight data-[checked]:bg-appPrimaryColor data-[checked]:text-appPrimaryLight data-[checked]:font-bold p-2 h-[45px] w-[45px] center-of-div cursor-pointer"
                    >{day}</Checkbox>
                ))}
            </div>
        </div>
    )
}

export default WeekdaysForm
