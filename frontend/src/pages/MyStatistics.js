import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { getCategories } from '../services/CategoryServices'
import CategoryDivider from '../components/mystatistics/CategoryDivider'
import Select from 'react-select'
import { selectStyles } from '../assets/data/selectOptions'

const MyStatistics = () => {
    const [categories, setCategories] = useState([])
    const [options, setOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({ value: 'all', label: 'All' })

    // fetch all user categories
    useEffect(() => {
        getCategories()
            .then(response => {
                const categoryOptions = []
                categoryOptions.push({ value: 'all', label: 'All' })
                response.forEach(element => {
                    const option = { value: element.category_id, label: element.category_name }
                    categoryOptions.push(option)
                });
                setOptions(categoryOptions)
                setCategories(response)
            })
    }, []);

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appPrimaryDark'>
            <TopBar icons={[]} title={'My Statistics'} />
            <div className='w-full max-w-4xl h-screen bg-appPrimaryLight no-scrollbar overflow-y-auto flex flex-col gap-4 py-3 my-[56px] px-3 lg:px-5'>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>Category: </div>
                    <Select
                        styles={selectStyles}
                        value={selectedCategory}
                        isClearable={false}
                        isSearchable={false}
                        onChange={e => setSelectedCategory(e)}
                        options={options} />
                </div>


                {categories.map((category, index) => (
                    (
                        selectedCategory.value === 'all' || category.category_id === selectedCategory.value) ?
                        <CategoryDivider category={category} key={index} />
                        :
                        <div key={index}></div>
                ))}
            </div>
            <BottomBar current={1} />
        </div>
    )
}

export default MyStatistics
