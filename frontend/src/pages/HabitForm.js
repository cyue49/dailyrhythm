import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate, useLocation } from 'react-router-dom'
import GeneralForm from '../components/habitsform/GeneralForm'
import WeekdaysForm from '../components/habitsform/WeekdaysForm'
import CategoryForm from '../components/habitsform/CategoryForm'
import { addHabit, updateHabit } from '../services/HabitServices'

const HabitForm = () => {
    const navigate = useNavigate()

    // mode and habit passed from route state
    const { state: { currentDay, mode, habit } = {} } = useLocation();

    // states for habits form
    const [form, setForm] = useState({
        habit_name: '',
        habit_description: '',
        frequency_count: ''
    })
    const [frequencyType, setFrequencyType] = useState({ value: '', label: 'Select' })
    const [checkedDays, setCheckedDays] = useState(new Array(7).fill(false))
    const [category, setCategory] = useState({ value: '', label: 'Select' })
    const [generalErrorMessage, setGeneralErrorMessage] = useState('')

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // form validation
        if (form.habit_name === '') {
            setGeneralErrorMessage('Name must not be empty.')
        } else if (category.value === '') {
            setGeneralErrorMessage('A category must be chosen.')
        } else if (form.frequency_count !== '' && frequencyType.value === '') {
            setGeneralErrorMessage('Incomplete fields for Frequency.')
        } else {
            // create new habit
            const data = JSON.stringify({
                habit_name: form.habit_name,
                habit_description: form.habit_description,
                frequency_count: form.frequency_count === '' ? 0 : parseInt(form.frequency_count),
                frequency_type: frequencyType.value,
                weekdays: checkedDays.map((day, index) => day ? index.toString() : '').join(''),
                category_id: category.value
            })
            if (mode === 'New') {
                addHabit(data)
                    .then(response => {
                        // navigate back to habits details page of the newly created habit
                        navigate('/myhabits/details', { state: { currentDay: currentDay, habit: response } })
                    })
            } else if (mode === 'Edit') {
                updateHabit(habit.habit_id, data)
                    .then(response => {
                        navigate('/myhabits/details', { state: { currentDay: currentDay, habit: response } })
                    })
            }
        }

    }

    // set default values if is edit
    useEffect(() => {
        if (mode === 'Edit') {
            setForm({
                habit_name: habit.habit_name,
                habit_description: habit.habit_description,
                frequency_count: habit.frequency_count === 0 ? '' : habit.frequency_count.toString()
            })
            setFrequencyType({ value: habit.frequency_type, label: habit.frequency_type })
            const habitCheckedDays = new Array(7).fill(false)
            for (let i = 0; i < 7; i++) {
                if (habit.weekdays.includes(i.toString())) habitCheckedDays[i] = true
            }
            setCheckedDays(habitCheckedDays)
        }
    }, [setForm, habit, mode])

    const navigateBack = () => { (mode === 'Edit') ? navigate('/myhabits/details', { state: { currentDay: currentDay, habit: habit } }) : navigate('/myhabits') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appPrimaryDark'>
            <TopBar icons={['back']} title={mode} backOnclick={navigateBack} />
            <div className='w-full max-w-4xl h-screen bg-appVariant-1 no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5 justify-between'>
                <div className='flex flex-col gap-4'>
                    <div className={`text-appImportant text-sm border-[1px] border-appImportant rounded-full p-2 ${(generalErrorMessage !== '') ? '' : 'hidden'}`}>{generalErrorMessage}</div>

                    <CategoryForm category={category} setCategory={setCategory} categoryID={habit.category_id} />
                    <GeneralForm form={form} setForm={setForm} frequencyType={frequencyType} setFrequencyType={setFrequencyType} />
                    <WeekdaysForm checkedDays={checkedDays} setCheckedDays={setCheckedDays} />
                </div>

                <div className='center-of-div flex-row gap-4 py-4'>
                    <div className='primary-variant-button hover:secondary-variant-button button-animation flex-1 center-of-div' onClick={navigateBack}>Cancel</div>
                    <div className='primary-color-button hover:secondary-color-button button-animation flex-1 center-of-div' onClick={handleSubmit}>Submit</div>
                </div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default HabitForm
