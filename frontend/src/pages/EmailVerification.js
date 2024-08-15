import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../services/AuthServices'

const EmailVerification = () => {
    const [isVerified, setisVerified] = useState(false)
    const [message, setMessage] = useState('Verifying email.')
    const [searchParams] = useSearchParams();

    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParams.get('token')

        verifyEmail(token)
            .then(response => {
                console.log(response)
                if (response === 'success') {
                    setisVerified(true)
                    setMessage('Your email account has been verified! Please refresh your app or click on the following button to go back to the app!')
                } else if (response === 'expired') {
                    setMessage('Your email verification link has expired. Please send a new verification email from your profile page.')
                } else {
                    setMessage('Your email account could not be verified.')
                }
            })
    }, [searchParams])

    const navigateTo = () => { navigate('/myhabits') }
    return (
        <div className='w-screen h-screen center-of-div bg-primaryColor text-primaryTextColor'>
            <div className='w-11/12 h-fit max-w-[450px] max-h-fit min-w-80 min-h-96 p-8 rounded-3xl bg-mainCardColor center-of-div flex-col gap-8'>
                <div className='text-center'>{message}</div>
                {
                    isVerified ? <div className='primary-color-button center-of-div' onClick={navigateTo}>Go to Daily Rhythm</div> : null
                }
            </div>

        </div>
    )
}

export default EmailVerification
