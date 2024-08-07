import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import UserCard from '../components/profile/UserCard'
import SettingsCard from '../components/profile/SettingsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        username: '',
        is_verified: '',
        image_url: '',
        created_on: ''
    })
    const navigate = useNavigate()

    const fetchOptions = {
        credentials: 'include'
    }

    const getUserInfo = async () => {
        try {
            fetch('http://127.0.0.1:5000/api/users/me', fetchOptions)
                .then((res) => {
                    if (res.status === 200 && res.ok) {
                        res.json()
                            .then((data) => console.log(data))
                    }
                })
                .catch((e) => {
                    console.log(e.message)
                })
        } catch (err) {
            console.error(err.message);
        }
    }

    const handlePasswordChange = () => {
        // todo
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
            <div className='w-full max-w-4xl h-screen bg-appWhite overflow-y-hidden flex flex-col pt-4 mt-[56px]'>
                <TopBar type={'title'} title={'User Profile'} />
                
                <div className='flex flex-col gap-4 mx-3 lg:mx-5'>
                    <UserCard user={user} />
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
        </div>
    )
}

export default Profile
