import React, { useState, useEffect, useCallback } from 'react'
import HabitCard from './HabitCard'

const CategoryDivider = ({ category }) => {
    const [habits, setHabits] = useState([])

    // fetch all user habits for this category
    const getCategories = useCallback(() => {
        fetch(`http://127.0.0.1:5000/api/custom_habits/active/${category.category_id}`, { credentials: 'include' })
            .then((res) => {
                if (res.status === 200 && res.ok) {
                    res.json()
                        .then((data) => {
                            setHabits(data)
                        })
                }
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, []);

    useEffect(() => {
        getCategories()
    }, [getCategories]);

    return (
        <div className='center-of-div flex-col flex-nowrap w-full gap-1'>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center gap-3'>
                <div className='text-appGreen font-bold'>{category.category_name}</div>
                <div className='center-of-div h-[2px] bg-appGreen flex-1'> </div>
                <div className='text-appGreen font-bold'>{habits.length}</div>
            </div>
            {habits.map((habit, index) => (
                <HabitCard habit={habit} key={index} />
            ))}
        </div>

    )
}

export default CategoryDivider
