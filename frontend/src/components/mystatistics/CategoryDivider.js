import React, { useState, useEffect } from 'react'
import { getHabitsForCategory } from '../../services/HabitServices'
import HabitCard from '../mystatistics/HabitCard'
import CategoryCard from '../mystatistics/CategoryCard'

const CategoryDivider = ({ category }) => {
    const [habits, setHabits] = useState([])

    // fetch all user habits for this category
    useEffect(() => {
        getHabitsForCategory(category.category_id)
            .then(response => {
                setHabits(response)
            })
    }, [category.category_id]);

    return (
        <div className='center-of-div flex-col flex-nowrap w-full gap-1'>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center gap-3'>
                <div className='text-primaryColor font-bold'>{category.category_name}</div>
                <div className='center-of-div h-[1px] bg-primaryColor flex-1'> </div>
                <div className='text-primaryColor font-bold'>{habits.length}</div>
            </div>
            <CategoryCard category={category} />
            {habits.map((habit, index) => (
                <HabitCard habit={habit} key={index} />
            ))}
        </div>
    )
}

export default CategoryDivider
