import React, { useState, useEffect } from 'react'
import { getInfo } from '../../services/UserServices'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from './Loading'

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    // check if user logged in 
    useEffect(() => {
        getInfo()
            .then(response => {
                if (response) {
                    setIsAuthenticated(true)
                } else {
                    navigate('/signin')
                }
            })
    }, [navigate])
    return isAuthenticated ? <Outlet /> : <Loading />
}

export default PrivateRoute
