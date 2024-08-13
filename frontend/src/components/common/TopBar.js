import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCaretLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({ icons, title, backOnclick, plusOnclick, ellipsisOnClick }) => {
    const [barIcons, setIcons] = useState([])

    useEffect(() => {
        setIcons(icons)
    }, [icons]);

    return (
        <div className={`bg-primaryColor text-secondaryTextColor fixed top-0 z-10 w-full max-w-4xl h-[56px] grid grid-cols-[10%_auto_10%]  gap-3 ${(barIcons.length !== 0) ? '' : ''}`}>
            <div className='text-3xl flex items-center justify-start pl-6'>
                <FontAwesomeIcon icon={faCaretLeft} className={`cursor-pointer px-2 ${barIcons.includes('back') ? '' : 'hidden'}`} onClick={backOnclick} />
            </div>
            <div className='font-bold text-2xl center-of-div truncate'><div className='truncate'>{title}</div></div>
            <div className='text-2xl flex items-center justify-end pr-6'>
                <FontAwesomeIcon icon={faCirclePlus} className={`cursor-pointer px-2 ${barIcons.includes('plus') ? '' : 'hidden'}`} onClick={plusOnclick}/>
                <FontAwesomeIcon icon={faEllipsisVertical} className={`cursor-pointer px-2 ${barIcons.includes('ellipsis') ? '' : 'hidden'}`} onClick={ellipsisOnClick}/>
            </div>
        </div>
    )
}

export default TopBar
