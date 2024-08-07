import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faUser, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const BottomBar = ({ current }) => {
    return (
        <div className='fixed bottom-0 flex flex-row items-center justify-evenly w-full max-w-4xl py-4 bg-appWhite lg:rounded-b-3xl'>
            <Link to={'/mystatistics'} className={`w-24 center-of-div hover:drop-shadow-xl hover:-translate-y-2 ${(current === 1) ? 'primary-green-button' : 'secondary-gray-button'}`}><FontAwesomeIcon icon={faChartSimple} /></Link>
            <Link to={'/myhabits'} className={`w-24 center-of-div hover:drop-shadow-xl hover:-translate-y-2 ${(current === 2) ? 'primary-green-button' : 'secondary-gray-button'}`}> <FontAwesomeIcon icon={faCalendarCheck} /> </Link>
            <Link to={'/profile'} className={`w-24 center-of-div hover:drop-shadow-xl hover:-translate-y-2 ${(current === 3) ? 'primary-green-button' : 'secondary-gray-button'}`}><FontAwesomeIcon icon={faUser} /></Link>
        </div>
    )
}

export default BottomBar
