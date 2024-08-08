import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCaretLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({ icons, title }) => {
    const [barIcons, setIcons] = useState([])

    useEffect(() => {
        setIcons(icons)
    }, []);

    return (
        <div className={`bg-appGreen text-appWhite fixed top-0 z-10 w-full max-w-4xl h-[56px] grid grid-cols-[10%_auto_10%]  gap-3 ${(barIcons.length !== 0) ? '' : ''}`}>
            <div className='text-3xl flex items-center justify-start pl-6'>
                <FontAwesomeIcon icon={faCaretLeft} className={`${barIcons.includes('back') ? '' : 'hidden'}`} />
            </div>
            <div className='font-bold text-2xl center-of-div'>{title}</div>
            <div className='text-2xl flex items-center justify-end pr-6'>
                <FontAwesomeIcon icon={faCirclePlus} className={`${barIcons.includes('plus') ? '' : 'hidden'}`} />
                <FontAwesomeIcon icon={faEllipsisVertical} className={`${barIcons.includes('ellipsis') ? '' : 'hidden'}`} />
            </div>
        </div>
    )
}

export default TopBar
