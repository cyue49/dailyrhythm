import React, { useState, useEffect } from 'react'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import WeeklyCalendar from '../components/myhabits/WeeklyCalendar'
import { weekDaysLong, monthsLong } from '../utils/DateUtils'
import CategoryDivider from '../components/myhabits/CategoryDivider'
import { getCategories } from '../services/CategoryServices'
import { getSettings } from '../services/UserServices'
import { DialogTitle, Dialog, DialogPanel } from '@headlessui/react'
import FilterDialog from '../components/myhabits/FilterDialog'

const MyHabits = () => {
    // states for current day, day start time, list of categories
    const [currentDay, setCurrentDay] = useState(new Date())
    const [categories, setCategories] = useState([])
    const [dayStartTime, setDayStartTime] = useState('0')
    const [dialogOpen, setDialogOpen] = useState(false) // show/don't show filter dialog
    const [categoryOptions, setCategoryOptions] = useState([]) // options for select category filter
    const [selectedCategory, setSelectedCategory] = useState({ value: 'all', label: 'All' }) // currently selected category in filter
    const [selectedCheckOption, setSelectedCheckOption] = useState({ value: 'all', label: 'All' })
    const [showTodayOnly, setShowTodayOnly] = useState(false)

    const formatDate = (date) => {
        return `${weekDaysLong[date.getDay()]} ${monthsLong[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

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
                setCategoryOptions(categoryOptions)
                setCategories(response)
            })
    }, []);

    // fetch day start time from user setting
    useEffect(() => {
        getSettings()
            .then(response => setDayStartTime(response.time_day_starts.toString().slice(0, 2)))
    }, []);

    // update current day based on user's day start time settings
    useEffect(() => {
        const adjustedDay = new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000)
        setCurrentDay(adjustedDay)
    }, [dayStartTime]);

    const navigate = useNavigate()

    // navigate to create new habit page
    const handleNavigate = () => {
        navigate('/myhabits/form',
            { state: { currentDay: currentDay, mode: 'New', habit: {} } }
        )
    }

    // handle resetting filter states
    const handleReset = () => {
        setSelectedCategory({ value: 'all', label: 'All' })
        setSelectedCheckOption({ value: 'all', label: 'All' })
        setShowTodayOnly(false)
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-webBgColor text-primaryTextColor'>
            <TopBar icons={['plus']} title={'My Habits'} plusOnclick={handleNavigate} />
            <div className='w-full max-w-4xl h-screen bg-mainBgColor overflow-y-hidden flex flex-col gap-4 my-[56px]'>
                <WeeklyCalendar currentDay={currentDay} setCurrentDay={setCurrentDay} dayStartTime={dayStartTime} />
                <div className='flex flex-col items-start justify-start gap-2 px-4 pb-4 no-scrollbar overflow-y-auto'>
                    <div className='w-full text-xl font-bold flex flex-row justify-between'>
                        <div>{formatDate(currentDay)}</div>
                        <FontAwesomeIcon className='text-neutralColor cursor-pointer' icon={faFilter} onClick={() => setDialogOpen(true)} />
                    </div>
                    {categories.map((category, index) => (
                        (
                            selectedCategory.value === 'all' || category.category_id === selectedCategory.value) ?
                            <CategoryDivider category={category} currentDay={currentDay} key={index} categories={categories} setCategories={setCategories} showTodayOnly={showTodayOnly} selectedCheckOption={selectedCheckOption} />
                            :
                            <div key={index} className='hidden'></div>
                    ))}
                </div>
            </div>
            <BottomBar current={2} />

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50 text-primaryTextColor">
                <div className="fixed inset-0 w-screen center-of-div bg-webBgColor/80 p-4">
                    <DialogPanel className="w-10/12 max-w-md flex flex-col bg-mainBgColor rounded-3xl border border-primaryColor py-4 px-6">
                        <div className='flex flex-row items-center justify-between py-1'>
                            <DialogTitle className='font-bold'>Filter</DialogTitle>
                            <div className='cursor-pointer text-primaryColor hover:text-secondaryTextColor hover:bg-primaryColor button-animation font-bold text-sm border rounded-full px-2 border-primaryColor' onClick={handleReset}>Reset</div>
                        </div>

                        <FilterDialog setDialogOpen={setDialogOpen} categoryOptions={categoryOptions} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} showTodayOnly={showTodayOnly} setShowTodayOnly={setShowTodayOnly} selectedCheckOption={selectedCheckOption} setSelectedCheckOption={setSelectedCheckOption} />
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default MyHabits
