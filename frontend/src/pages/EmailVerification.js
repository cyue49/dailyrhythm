import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../services/AuthServices'

const EmailVerification = () => {
    const [isVerified, setisVerified] = useState(false)
    const [message, setMessage] = useState('Verifying email.')
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        const token = searchParams.get('token')

        verifyEmail(token)
            .then(response => {
                console.log(response)
                if (response === 'success') {
                    setisVerified(true)
                    setMessage('Your email account has been verified! Click on the following button to go back to the app!')
                } else if (response === 'expired') {
                    setMessage('Your email verification link has expired. Please send a new verification email from your profile page.')
                } else {
                    setMessage('Your email account could not be verified.')
                }
            })
    }, [searchParams])

    return (
        <div className='center-of-div flex-col gap-4'>
            <div>{message}</div>
            {
                isVerified ? <div>Show button here</div> : null
            }
        </div>
    )
}

export default EmailVerification
