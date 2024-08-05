import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/api/auth/signin',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    user_password: password
                })
            }
        ).then((res) => {
            if (res.status === 200 && res.ok) {
                // redirects to profile page
                navigate('/profile')
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }

    return (
        <div className='h-screen w-screen min-w-screen min-h-screen center-of-div bg-appGreen text-appBlack'>
            <div className='w-10/12 h-fit max-w-[450px] max-h-fit min-w-80 min-h-96 p-8 rounded-3xl bg-appGray-1 flex flex-col'>
                <img
                    className='w-10 h-10 self-center'
                    src={require(`../assets/applogo.png`)}
                    alt="app logo"
                />
                <p className='text-3xl font-bold font-sans my-6'>Sign In</p>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <label className='form-label'>Email: </label>
                    <input className='form-text-input' type='text' name='email' onChange={(e) => { setEmail(e.target.value) }} />
                    <label className='form-label'>Password: </label>
                    <input className='form-text-input' type='password' name='user_password' onChange={(e) => { setPassword(e.target.value) }} />
                    <input className='primary-green-button hover:secondary-green-button mt-8' type="submit" value="Sign In" />
                </form>
                <div className='text-sm text-center mt-4 mb-8 hover:underline hover:text-appGreen'>
                    <Link to={'/signup'} className='underline underline-offset-2'>Don't have an account? Sign up instead!</Link>
                </div>

            </div>
        </div>
    )
}

export default SignIn
