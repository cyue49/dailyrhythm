import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { Checkbox } from '@headlessui/react'
import { weekDaysShort } from '../utils/DateUtils'
import Select from 'react-select'
import { selectStyles, frequencyOptions } from '../assets/data/selectOptions'

const HabitForm = () => {
    // mode and habit passed from route state
    const { state: { currentDay, mode, habit } = {} } = useLocation();

    // states for habits form
    const [form, setForm] = useState({
        habit_name: '',
        habit_description: '',
        frequency_count: ''
    })
    const [frequencyType, setFrequencyType] = useState({ value: '', label: '' })
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
        const data = JSON.stringify({
            habit_name: form.habit_name,
            habit_description: form.habit_description,
            frequency_count: parseInt(form.frequency_count),
            frequency_type: frequencyType.value,
            weekdays: checkedDays.map((day, index) => day ? index.toString() : '').join(''),
            category_id: ''
        })
        console.log(data)
        console.log('submit')
    }

    useEffect(() => {
        if (mode === 'Edit') {
            setForm({
                habit_name: habit.habit_name,
                habit_description: habit.habit_description,
                frequency_count: habit.frequency_count.toString()
            })
            setFrequencyType({ value: habit.frequency_type, label: habit.frequency_type })
        }
    }, [setForm, habit, mode])

    const navigate = useNavigate()
    const navigateBack = () => { (mode === 'Edit') ? navigate('/myhabits/details', { state: { currentDay: currentDay, habit: habit } }) : navigate('/myhabits') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={mode} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5 justify-between'>
                <div className='flex flex-col gap-4'>
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
                            <Select
                                className='w-40'
                                styles={selectStyles}
                                value={frequencyType}
                                isClearable={false}
                                isSearchable={false}
                                onChange={e => setFrequencyType(e)}
                                options={frequencyOptions} />
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
                </div>

                <div className='center-of-div flex-row gap-4 py-8'>
                    <div className='primary-gray-button hover:secondary-gray-button button-animation flex-1 center-of-div' onClick={navigateBack}>Cancel</div>
                    <div className='primary-green-button hover:secondary-green-button button-animation flex-1 center-of-div' onClick={handleSubmit}>Submit</div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitForm
