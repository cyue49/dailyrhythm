import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { useNavigate } from 'react-router-dom'
import { getArchivedHabits } from '../services/HabitServices'
import ArchivedHabitCard from '../components/archivedhabits/ArchivedHabitCard'

const ArchivedHabits = () => {
    const navigate = useNavigate()

    // states
    const [habits, setHabits] = useState([])
    const [selectedHabits, setSelectedHabits] = useState([])

    // fetch all archived habits for the user
    useEffect(() => {
        getArchivedHabits()
            .then(response => {
                setHabits(response)
            })
    }, []);

    const goBack = () => { navigate('/profile') }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={['back']} title={'Archived Habits'} backOnclick={goBack} />
            <div className='w-full max-w-4xl h-screen bg-appWhite no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5'>
                <div className='center-of-div flex-row gap-3'>
                    <div className='secondary-red-button hover:primary-red-button button-animation flex-1 center-of-div'>Delete</div>
                    <div className='secondary-green-button hover:primary-green-button button-animation flex-1 center-of-div'>Unarchive</div>
                </div>
                {habits.map((habit, index) => (
                    <ArchivedHabitCard key={index} habit={habit} selectedHabits={selectedHabits} setSelectedHabits={setSelectedHabits} />
                ))}
            </div>
            <BottomBar current={3} />
        </div>
    )
}

export default ArchivedHabits
