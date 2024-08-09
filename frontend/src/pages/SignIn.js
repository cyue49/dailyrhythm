import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()

    // check if user already logged in, if yes, redirect to signed in page
    useEffect(() => {
        const getUserInfo = async () => {
            fetch('http://127.0.0.1:5000/api/users/me', { credentials: 'include' })
                .then((res) => {
                    if (res.status === 200 && res.ok) {
                        // user already signed in redirect to homepage
                        navigate('/myhabits')
                    } 
                })
                .catch((e) => {
                    console.log(e.message)
                })
        }

        getUserInfo();
    }, [navigate])

    // states for sign in form
    const [form, setForm] = useState({ email: '', user_password: '' })
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [generalErrorMessage, setGeneralErrorMessage] = useState('')

    const validateInputs = useCallback(() => {
        // email regex
        const emailRe = new RegExp(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)

        if (emailRe.test(form.email)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
        (form.user_password === '') ? setValidPassword(false) : setValidPassword(true)

        // set general message to empty string when user restarts typing
        setGeneralErrorMessage('')
    }, [form])

    useEffect(() => {
        validateInputs()
    }, [validateInputs]);

    // handle updating state when typing for each input field
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // handle submitting the form and sending a request to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/api/auth/signin',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: form.email,
                    user_password: form.user_password
                })
            }
        ).then((res) => {
            if (res.status === 200 && res.ok) {
                // redirects to profile page
                navigate('/myhabits')
            } else if (res.status === 400) { // invalid email / password
                setGeneralErrorMessage('Invalid email or password.')
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }

    return (
        <div className='h-screen w-screen min-w-screen min-h-screen center-of-div bg-appGreen'>
            <div className='w-11/12 h-fit max-w-[450px] max-h-fit min-w-80 min-h-96 p-8 rounded-3xl bg-appGray-1 flex flex-col'>
                <Link to={'/'} className='self-center'>
                    <img
                        className='size-10 hover:scale-110 button-amination'
                        src={require(`../assets/applogo.png`)}
                        alt="app logo"
                    />
                </Link>

                <p className='text-2xl font-bold font-sans my-6'>Sign In</p>
                <div className={`text-appRed text-sm border-[1px] border-appRed rounded-full p-2 mb-6 ${(generalErrorMessage !== '') ? '' : 'hidden'}`}>{generalErrorMessage}</div>

                <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email <span className='text-appRed'>*</span> : </label>
                    <input className='form-text-input' type='text' name='email' id='email' autoComplete='on' autoCapitalize='off' onChange={handleChange} />
                    <div className={`text-appRed text-sm ${(form.email !== '' && !validEmail) ? '' : 'hidden'}`}>Invalid email.</div>

                    <label htmlFor='user_password' className='mt-3'>Password <span className='text-appRed'>*</span> : </label>
                    <input className='form-text-input' type='password' name='user_password' id='user_password' onChange={handleChange} />

                    <input className='mt-12 primary-green-button hover:secondary-green-button button-animation disabled:hover:primary-green-button disabled:cursor-not-allowed' type="submit" value="Sign In" disabled={!(validEmail && validPassword)} />
                </form>

                <div className='text-sm text-center mt-4 mb-8 hover:underline hover:text-appGreen'>
                    <Link to={'/signup'} className='underline underline-offset-2'>Don't have an account? Sign up instead!</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
