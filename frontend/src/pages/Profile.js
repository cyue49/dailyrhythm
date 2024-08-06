import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import UserCard from '../components/profile/UserCard'
import SettingsCard from '../components/profile/SettingsCard'

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
            <div className='w-full max-w-5xl h-screen bg-appWhite lg:rounded-3xl overflow-y-hidden flex flex-col gap-3'>
                <TopBar type={'title'} title={'User Profile'} />
                <UserCard user={user} />
                <SettingsCard />
            </div>
        </div>
    )
}

export default Profile
