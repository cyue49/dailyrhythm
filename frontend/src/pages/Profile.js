import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()


    const handleSignOut = async () => {
        fetch('http://127.0.0.1:5000/api/auth/signout')
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
        </div>
    )
}

export default Profile
