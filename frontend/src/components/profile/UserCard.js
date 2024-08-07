import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPenToSquare, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const UserCard = ({ user }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [form, setForm] = useState({ username: 'Chen Yue', email: 'yuechen049@gmail.com' })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = () => {
        if (isEdit) {
            // handle request to db
            console.log('saving to db')
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }

    return (
        <div className='flex flex-row gap-5 p-5 items-center bg-appGray-1 rounded-3xl'>
            <img
                className='size-[70px]'
                src={require(`../../assets/profiles/profile1.png`)}
                alt="default profile"
            />
            <div className='flex flex-col gap-3 truncate w-full'>
                <div className='flex flex-row gap-2 items-center justify-between'>
                    {!isEdit ?
                        <span className='font-bold text-2xl truncate'>{form.username}</span> :
                        <div className='flex flex-col w-10/12'>
                            <div className='font-bold'>Username:</div>
                            <input className='form-text-input w-full truncate' type='text' name='username' id='username' autoComplete='on' autoCapitalize='off' placeholder='Username' value={form.username} onChange={handleChange} />
                        </div>

                    }
                    <FontAwesomeIcon icon={isEdit ? faCircleCheck : faPenToSquare} className='text-2xl text-appGreen cursor-pointer' onClick={handleEdit} />
                </div>

                <div>
                    {!isEdit ?
                        <div className='flex flex-row gap-2 items-center text-appGray-3'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className='truncate'>{form.email}</span>
                        </div> :
                        <div className='flex flex-col w-10/12'>
                            <div className='font-bold'>Email:</div>
                            <input className='form-text-input w-full truncate' type='text' name='email' id='email' autoComplete='on' autoCapitalize='off' placeholder='Email' value={form.email} onChange={handleChange} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserCard
