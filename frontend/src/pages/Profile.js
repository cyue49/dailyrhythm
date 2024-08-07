import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import UserCard from '../components/profile/UserCard'
import SettingsCard from '../components/profile/SettingsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
    const navigate = useNavigate()

    const fetchOptions = {
        credentials: 'include'
    }

    const handlePasswordChange = () => {
        // bring pop up modal to enter old pwd and new pwd, if old pwd correct set pwd as new pwd
        // create new component for pop up modal
    }

    const handleSignOut = async () => {
        fetch('http://127.0.0.1:5000/api/auth/signout', fetchOptions)
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
                <Link to={'/archivedhabits'} className='flex flex-row p-5 items-center bg-appGray-1 rounded-3xl justify-between hover:bg-appGray-2 active:bg-appGray-2'>
                    <div className='font-bold'>Manage archived habits</div>
                    <FontAwesomeIcon icon={faCaretRight} className='text-appGreen text-2xl' />
                </Link>
                <button className='secondary-green-button hover:primary-green-button' onClick={handlePasswordChange}>Change password</button>
                <button className='primary-red-button hover:secondary-red-button' onClick={handleSignOut}>Logout</button>
            </div>
            <BottomBar current={3} />
        </div>
    )
}

export default Profile
