import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { Checkbox } from '@headlessui/react'
import { weekDaysShort } from '../utils/DateUtils'

const HabitForm = () => {
    // mode and habit passed from route state
    const { state: { currentDay, mode, habit } = {} } = useLocation();

    // states for habits form
    const [form, setForm] = useState({
        habit_name: '',
        habit_description: '',
        frequency_count: '0',
        frequency_type: ''
    })
    const [checkedDays, setCheckedDays] = useState(new Array(7).fill(false))

    // handle change when updating form inputs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // handle checking/unchecking the checkboxes for weekday selection
    const handleCheck = (position) => {
        setCheckedDays(checkedDays.map((day, index) => index === position ? !day : day))
    }

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
    }

    useEffect(() => {
        if (mode === 'Edit') {
            setForm({
                habit_name: habit.habit_name,
                habit_description: habit.habit_description,
                frequency_count: habit.frequency_count.toString(),
                frequency_type: habit.frequency_type
            })
        }
    }, [setForm, habit, mode])

    const navigate = useNavigate()
    const navigateBack = () => { (mode === 'Edit') ? navigate('/myhabits/details', { state: { currentDay: currentDay, habit: habit } }) : navigate('/myhabits') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={mode} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5 justify-between'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label className='font-bold' htmlFor='habit_name'>Name <span className='text-appRed'>*</span> : </label>
                        <input className='form-text-input' type='text' name='habit_name' id='habit_name' value={form.habit_name} onChange={handleChange} />
                    </div>


                    <div className='flex flex-col gap-1'>
                        <label className='font-bold' htmlFor='habit_description'>Description: </label>
                        <textarea className='form-text-input rounded-2xl' type='text' rows='5' name='habit_description' id='habit_description' value={form.habit_description} onChange={handleChange}></textarea>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-bold' htmlFor='frequency_count'>Frequency: </label>
                        <div className='flex flex-row items-center justify-evenly'>
                            <input className='form-text-input w-20' type='number' name='frequency_count' id='frequency_count' value={form.frequency_count} onChange={handleChange} />
                            <div> time(s) per </div>
                            <input className='form-text-input w-40' type='text' name='frequency_type' id='frequency_type' value={form.frequency_type} onChange={handleChange} />
                        </div>

                    </div>

                    <div className='flex flex-col gap-1'>
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
                                    className="rounded-full border border-appGreen bg-appWhite data-[checked]:bg-appGreen data-[checked]:text-appWhite data-[checked]:font-bold p-2 h-[45px] w-[45px] center-of-div cursor-pointer"
                                >{day}</Checkbox>
                            ))}
                        </div>
                    </div>
                </form>

                <div className='center-of-div flex-row gap-4 py-8'>
                    <div className='primary-gray-button hover:secondary-gray-button button-animation flex-1 center-of-div'>Cancel</div>
                    <div className='primary-green-button hover:secondary-green-button button-animation flex-1 center-of-div'>Submit</div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitForm
