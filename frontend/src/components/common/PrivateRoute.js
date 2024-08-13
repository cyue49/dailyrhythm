import React, { useState, useEffect } from 'react'
import { getSettings } from '../../services/UserServices'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from './Loading'

const PrivateRoute = ({ setAppTheme }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    // check if user logged in and set app theme if yes
    useEffect(() => {
        getSettings()
            .then(response => {
                if (response) {
                    setAppTheme(response.theme)
                    setIsAuthenticated(true)
                } else {
                    navigate('/signin')
                }
            })
    }, [navigate])
    return isAuthenticated ? <Outlet /> : <Loading />
}

export default PrivateRoute
