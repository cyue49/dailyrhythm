import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Toast = ({ isSuccess, message, isVisible }) => {
    return (
        <div className={`fixed bottom-0 right-0 z-50 w-full max-w-80 border border-appGreen bg-appWhite text-appBlack p-2 m-3 mb-20 lg:mb-3 rounded-2xl flex flex-row items-center gap-2 justify-start ${isVisible ? '' : 'hidden'} fade-animation`}>
            <FontAwesomeIcon icon={isSuccess ? faCircleCheck : faCircleXmark} className={`p-1 text-xl ${isSuccess ? 'text-appGreen' : 'text-appRed'}`} />
            <div className='line-clamp-3'>{message}</div>
        </div>
    )
}

export default Toast
