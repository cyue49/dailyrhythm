import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import UserCard from '../components/profile/UserCard'
import SettingsCard from '../components/profile/SettingsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const Profile = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const navigate = useNavigate()

    const handlePasswordChange = () => {
        // todo: handle password change
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
            <TopBar type={'title'} title={'User Profile'} />
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col gap-4 pt-4 mt-[56px] px-3 lg:px-5'>
                <UserCard />
                <SettingsCard />
                <Link to={'/archivedhabits'} className='flex flex-row p-5 items-center bg-appGray-1 rounded-3xl justify-between hover:bg-appGray-2 active:bg-appGray-2 button-animation'>
                    <div className='font-bold'>Manage archived habits</div>
                    <FontAwesomeIcon icon={faCaretRight} className='text-appGreen text-2xl' />
                </Link>
                <div className='flex flex-row gap-2 flex-wrap'>
                    <button className='primary-green-button hover:secondary-green-button button-animation w-full md:flex-1' onClick={() => setModalOpen(true)}>Change password</button>
                    <button className='primary-red-button hover:secondary-red-button button-animation w-full md:flex-1' onClick={handleSignOut}>Logout</button>
                </div>


                <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 w-screen center-of-div bg-appBlack bg-opacity-75 p-4">
                        <DialogPanel className="w-full max-w-lg p-4 center-of-div flex-col bg-appWhite border-2 rounded-3xl border-appGreen">
                            <DialogTitle className="font-bold text-lg mb-4">Change Password</DialogTitle>
                            <div className='flex flex-col justify-start items-start gap-2 w-full lg:w-10/12'>
                                <div>Please enter your old password: </div>
                                <input className='form-text-input w-full truncate' type='password' name='passwordOld' id='passwordOld' />
                                <div>Please enter your new password: </div>
                                <input className='form-text-input w-full truncate' type='password' name='passwordNew' id='passwordNew' />
                                <div className='center-of-div flex-col gap-4 w-full my-6'>
                                    <button className='primary-green-button hover:secondary-green-button button-animation w-full' onClick={handlePasswordChange}>Update password</button>
                                    <button className='primary-gray-button hover:secondary-gray-button button-animation w-full' onClick={() => setModalOpen(false)}>Cancel</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
            <BottomBar current={3} />
        </div>
    )
}

export default Profile
