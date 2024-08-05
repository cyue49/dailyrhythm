import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState({})
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
        <div>
            <button onClick={handleSignOut}>Sign out</button>
            <button onClick={getUserInfo}>Test</button>

        </div>
    )
}

export default Profile
