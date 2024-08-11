import React from 'react'
import Select from 'react-select'
import { selectStyles, frequencyOptions } from '../../assets/data/selectOptions'

const GeneralForm = ({ form, setForm, frequencyType, setFrequencyType }) => {
    // handle change when updating form inputs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <div className='font-bold' htmlFor='habit_name'>Name <span className='text-appRed'>*</span> : </div>
                <input className='form-text-input' type='text' name='habit_name' id='habit_name' value={form.habit_name} onChange={handleChange} />
            </div>


            <div className='flex flex-col gap-1'>
                <div className='font-bold' htmlFor='habit_description'>Description: </div>
                <textarea className='form-text-input rounded-2xl' type='text' rows='5' name='habit_description' id='habit_description' value={form.habit_description} onChange={handleChange}></textarea>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='font-bold' htmlFor='frequency_count'>Frequency: </div>
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
        </div>
    )
}

export default GeneralForm
