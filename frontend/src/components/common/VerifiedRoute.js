import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getInfo } from '../../services/UserServices'
import Loading from './Loading'

const VerifiedRoute = () => {
    const [isVerified, setIsVerified] = useState(false)

    const navigate = useNavigate()

    // check if user logged in and set app theme if yes
    useEffect(() => {
        getInfo()
            .then(response => {
                if (response.is_verified) {
                    setIsVerified(true)
                } else {
                    navigate('/profile')
                }
            })
    }, [navigate])
    return isVerified ? <Outlet /> : <Loading />
}

export default VerifiedRoute
