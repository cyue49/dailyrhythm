import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassowrd] = useState('')
    const [validForm, setValidForm] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/api/users/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    username: username,
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
        <div>
            <div className='h-screen w-screen min-w-screen min-h-screen center-of-div bg-appGreen'>
                <div className='w-11/12 h-fit max-w-[450px] max-h-fit min-w-80 min-h-96 p-8 rounded-3xl bg-appGray-1 flex flex-col'>
                    <Link to={'/'} className='self-center'>
                        <img
                            className='w-10 h-10'
                            src={require(`../assets/applogo.png`)}
                            alt="app logo"
                        />
                    </Link>
                    
                    <p className='text-2xl font-bold font-sans my-6'>Sign Up</p>

                    <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email <span className='text-appRed'>*</span> : </label>
                        <input className='form-text-input' type='text' name='email' id='email' autoComplete='on' autoCapitalize='off' onChange={(e) => { setEmail(e.target.value) }} />

                        <label htmlFor='username'>Username <span className='text-appRed'>*</span> : </label>
                        <input className='form-text-input' type='text' name='username' id='username' autoComplete='on' autoCapitalize='off' onChange={(e) => { setUsername(e.target.value) }} />

                        <label htmlFor='user_password'>Password <span className='text-appRed'>*</span> : </label>
                        <input className='form-text-input' type='password' name='user_password' id='user_password' onChange={(e) => { setPassword(e.target.value) }} />

                        <label htmlFor='confirm_password'>Confirm Password <span className='text-appRed'>*</span> : </label>
                        <input className='form-text-input' type='password' name='confirm_password' id='confirm_password' onChange={(e) => { setConfirmPassowrd(e.target.value) }} />

                        <input className='primary-green-button hover:secondary-green-button disabled:hover:primary-green-button mt-8 disabled:cursor-not-allowed' type="submit" value="Sign Up" disabled={!validForm} />
                    </form>

                    <div className='text-sm text-center mt-4 mb-8 hover:underline hover:text-appGreen'>
                        <Link to={'/signin'} className='underline underline-offset-2'>Already have an account? Sign in instead!</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp
