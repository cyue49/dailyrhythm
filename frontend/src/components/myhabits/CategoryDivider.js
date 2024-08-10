import React, { useState, useEffect, useCallback } from 'react'
import HabitCard from './HabitCard'
import { getHabitsForCategory } from '../../services/HabitServices'

const CategoryDivider = ({ category, currentDay }) => {
    const [habits, setHabits] = useState([])

    // fetch all user habits for this category
    const getHabits = useCallback(() => {
        getHabitsForCategory(category.category_id)
            .then(response => setHabits(response))
    }, [category.category_id]);

    useEffect(() => {
        getHabits()
    }, [getHabits]);

    return (
        <div className='center-of-div flex-col flex-nowrap w-full gap-1'>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center gap-3'>
                <div className='text-appGreen font-bold'>{category.category_name}</div>
                <div className='center-of-div h-[2px] bg-appGreen flex-1'> </div>
                <div className='text-appGreen font-bold'>{habits.length}</div>
            </div>
            {habits.map((habit, index) => (
                <HabitCard habit={habit} currentDay={currentDay} key={index} />
            ))}
        </div>

    )
}

export default CategoryDivider
