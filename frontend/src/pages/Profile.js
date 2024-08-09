import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TopBar from '../components/common/TopBar'
import BottomBar from '../components/common/BottomBar'
import UserCard from '../components/profile/UserCard'
import SettingsCard from '../components/profile/SettingsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Toast from '../components/common/Toast'

const Profile = () => {
    // states for popup modal for change password
    const [modalOpen, setModalOpen] = useState(false)
    const [form, setForm] = useState({
        old_password: '',
        new_password: ''
    })
    const [validOldPassword, setValidOldPassword] = useState(false)
    const [validNewPassword, setValidNewPassword] = useState(false)
    const [generalErrorMessage, setGeneralErrorMessage] = useState('')

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

    // validate form inputs
    const validateInputs = useCallback(() => {
        // validations & regex
        const passwordRe = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        if (passwordRe.test(form.new_password)) {
            setValidNewPassword(true)
        } else {
            setValidNewPassword(false)
        }
        (form.old_password === '') ? setValidOldPassword(false) : setValidOldPassword(true)

        // set general message to empty string when user restarts typing
        setGeneralErrorMessage('')
    }, [form]);

    useEffect(() => {
        validateInputs()
    }, [validateInputs]);

    // handle updating state when typing for each input field
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const handlePasswordChange = () => {
        fetch(' http://127.0.0.1:5000/api/users/me/edit/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                old_password: form.old_password,
                new_password: form.new_password
            })
        })
            .then((res) => {
                if (res.status === 200 && res.ok) {
                    toast('Password updated successfully!')
                    setModalOpen(false)
                } else {
                    setGeneralErrorMessage('Error updating password. Please make sure you have entered your old password correctly.')
                }
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    // sign out user
    const handleSignOut = async () => {
        fetch('http://127.0.0.1:5000/api/auth/signout', { credentials: 'include' })
            .then((res) => {
                if (res.status === 200 && res.ok) {
                    // redirects to home page
                    navigate('/')
                }
            }).catch((e) => {
                console.log(e.message)
            })
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-appBlack'>
            <TopBar icons={[]} title={'User Profile'} />
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                <UserCard />
                <SettingsCard />
                <Link to={'/archivedhabits'} className='flex flex-row p-5 items-center bg-appGray-1 rounded-3xl justify-between hover:bg-appGray-2 active:bg-appGray-2 button-animation'>
                    <div className='font-bold'>Manage archived habits</div>
                    <FontAwesomeIcon icon={faCaretRight} className='text-appGreen text-2xl' />
                </Link>
                <div className='flex flex-row gap-4 flex-wrap'>
                    <button className='primary-green-button hover:secondary-green-button button-animation w-full md:flex-1' onClick={() => setModalOpen(true)}>Change password</button>
                    <button className='primary-red-button hover:secondary-red-button button-animation w-full md:flex-1' onClick={handleSignOut}>Logout</button>
                </div>


                <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 w-screen center-of-div bg-appBlack bg-opacity-80 p-4">
                        <DialogPanel className="w-full max-w-lg p-4 center-of-div flex-col bg-appWhite border-2 rounded-3xl border-appGreen">
                            <DialogTitle className="font-bold text-lg mb-4">Change Password</DialogTitle>
                            <div className={`text-appRed text-sm border-[1px] border-appRed rounded-full py-2 px-6 mb-6  ${(generalErrorMessage !== '') ? '' : 'hidden'}`}>{generalErrorMessage}</div>
                            <div className='flex flex-col justify-start items-start gap-2 w-full lg:w-10/12'>
                                <div>Please enter your old password <span className='text-appRed'>*</span> : </div>
                                <input className='form-text-input w-full truncate' type='password' name='old_password' id='old_password' onChange={handleChange} />
                                <div>Please enter your new password <span className='text-appRed'>*</span> : </div>
                                <input className='form-text-input w-full truncate' type='password' name='new_password' id='new_password' onChange={handleChange} />
                                <div className={`text-appRed text-sm ${(form.new_password !== '' && !validNewPassword) ? '' : 'hidden'}`}>Passwords needs to be at least 8 characters long and contain an uppercase, a lowercase, a special character, and a number.</div>
                                <div className='center-of-div flex-col gap-4 w-full my-6'>
                                    <button className='primary-green-button hover:secondary-green-button disabled:hover:primary-green-button disabled:cursor-not-allowed button-animation w-full' onClick={handlePasswordChange} disabled={!(validNewPassword && validOldPassword)}>Update password</button>
                                    <button className='primary-gray-button hover:secondary-gray-button button-animation w-full' onClick={() => setModalOpen(false)}>Cancel</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
            <Toast isSuccess={true} message={message} isVisible={isVisible} />
            <BottomBar current={3} />
        </div>
    )
}

export default Profile
