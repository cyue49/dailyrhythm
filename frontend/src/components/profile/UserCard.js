import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPenToSquare, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Toast from '../common/Toast'
import { getInfo, updateInfo } from '../../services/UserServices'

const UserCard = () => {
    // states for editing username and email 
    const [isEdit, setIsEdit] = useState(false)
    const [form, setForm] = useState({ username: '', email: '' })
    const [validEmail, setValidEmail] = useState(true)
    const [validUsername, setValidUsername] = useState(true)

    // states for toast message
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('')

    // toast a notif message
    const toast = (mess) => {
        setIsVisible(true);
        setMessage(mess)

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }

    // fetch user info
    useEffect(() => {
        getInfo()
            .then(response => {
                setForm({
                    username: response.username,
                    email: response.email
                })
            })
    }, [])

    // validate form inputs 
    const validateInputs = useCallback(() => {
        if (isEdit) {
            // validations & regex
            const emailRe = new RegExp(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)
            const usernameRe = new RegExp(/^[\w\s-]{1,50}$/)

            if (emailRe.test(form.email)) {
                setValidEmail(true)
            } else {
                setValidEmail(false)
            }
            if (usernameRe.test(form.username)) {
                setValidUsername(true)
            } else {
                setValidUsername(false)
            }
        }

    }, [form, isEdit]);

    useEffect(() => {
        validateInputs()
    }, [validateInputs]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // update username and email in database
    const handleEdit = () => {
        if (isEdit) {
            const data = JSON.stringify({
                username: form.username,
                email: form.email
            })
            updateInfo(data)
                .then(response => {
                    if (response === 1) {
                        setIsEdit(false)
                        toast('User info updated successfully!')
                    } else {
                        toast('Error updating user info.')
                    }
                })
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
                <div className='flex flex-row gap-2 justify-between items-start'>
                    {!isEdit ?
                        <span className='font-bold text-2xl truncate'>{form.username}</span> :
                        <div className='flex flex-col w-10/12'>
                            <div className='font-bold'>Username:</div>
                            <input className='form-text-input w-full truncate' type='text' name='username' id='username' autoComplete='on' autoCapitalize='off' placeholder='Username' value={form.username} onChange={handleChange} />
                            <div className={`text-appRed text-sm ${(form.username !== '' && !validUsername) ? '' : 'hidden'}`}>Invalid character in username.</div>
                        </div>

                    }
                    <FontAwesomeIcon icon={isEdit ? faCircleCheck : faPenToSquare} className={`text-2xl text-appGreen cursor-pointer ${(isEdit && (!validEmail || !validUsername)) ? 'cursor-not-allowed opacity-70' : ''}`} onClick={handleEdit} />
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
                            <div className={`text-appRed text-sm ${(form.email !== '' && !validEmail) ? '' : 'hidden'}`}>Invalid email.</div>
                        </div>
                    }
                </div>
            </div>
            <Toast isSuccess={!isEdit} message={message} isVisible={isVisible} />
        </div>
    )
}

export default UserCard
