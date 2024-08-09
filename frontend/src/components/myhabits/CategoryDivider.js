import React from 'react'
import HabitCard from './HabitCard'

const CategoryDivider = ({ category }) => {
    return (
        <div className='center-of-div flex-col flex-nowrap w-full gap-1'>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center gap-3'>
                <div className='text-appGreen font-bold'>{category.category_name}</div>
                <div className='center-of-div h-[2px] bg-appGreen flex-1'> </div>
                <div className='text-appGreen font-bold'>2</div>
            </div>
            <HabitCard />
        </div>

    )
}

export default CategoryDivider
