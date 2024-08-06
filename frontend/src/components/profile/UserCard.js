import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const UserCard = ({ user }) => {
    return (
        <div className='flex flex-row gap-5 p-5 mx-3 items-center bg-appGray-1 rounded-3xl'>
            <img
                className='size-[80px]'
                src={require(`../../assets/profiles/profile1.png`)}
                alt="default profile"
            />
            <div className='flex flex-col gap-3 truncate w-full'>
                <div className='flex flex-row gap-2 items-center justify-between'>
                    <span className='font-bold text-2xl'>Chen Yue</span>
                    <FontAwesomeIcon icon={faPenToSquare} className='text-2xl text-appGreen' />
                </div>

                <div className='flex flex-row gap-2 items-center text-appGray-3'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className='truncate'>yuechen049@gmail.com</span>
                </div>
            </div>
        </div>
    )
}

export default UserCard
