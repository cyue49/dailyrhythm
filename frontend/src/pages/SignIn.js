import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getInfo } from '../services/UserServices'
import { signIn } from '../services/AuthServices'
import { Checkbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const SignIn = () => {
    const navigate = useNavigate()

    // check if user already logged in, if yes, redirect to signed in page
    useEffect(() => {
        getInfo()
            .then(response => {
                // if user already signed in, redirect to Habits homepage
                if (response) navigate('/myhabits')
            })
    }, [navigate])

    // states for sign in form
    const [form, setForm] = useState({ email: '', user_password: '' })
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [generalErrorMessage, setGeneralErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            email: form.email,
            user_password: form.user_password
        })
        signIn(data)
            .then(response => {
                if (response === 1) {
                    navigate('/myhabits')
                } else {
                    setGeneralErrorMessage('Invalid email or password.')
                }
            })
    }

    return (
        <div className='h-screen w-screen min-w-screen min-h-screen center-of-div bg-primaryColor text-primaryTextColor'>
            <div className='w-11/12 h-fit max-w-[450px] max-h-fit min-w-80 min-h-96 p-8 rounded-3xl bg-mainCardColor flex flex-col appear-bottom-animation'>
                <Link to={'/'} className='self-center'>
                    <img
                        className='size-10 hover:scale-110 button-amination'
                        src={require(`../assets/applogo.png`)}
                        alt="app logo"
                    />
                </Link>

                <p className='text-2xl font-bold font-sans my-6'>Sign In</p>
                <div className={`text-importantColor text-sm border-[1px] border-importantColor rounded-full p-2 mb-6 ${(generalErrorMessage !== '') ? '' : 'hidden'}`}>{generalErrorMessage}</div>

                <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email <span className='text-importantColor'>*</span> : </label>
                    <input className='form-text-input' type='text' name='email' id='email' autoComplete='on' autoCapitalize='off' onChange={handleChange} />
                    <div className={`text-importantColor text-sm ${(form.email !== '' && !validEmail) ? '' : 'hidden'}`}>Invalid email.</div>

                    <label htmlFor='user_password' className='mt-3'>Password <span className='text-importantColor'>*</span> : </label>
                    <input className='form-text-input' type={showPassword ? 'text' : 'password'} name='user_password' id='user_password' onChange={handleChange} />

                    <div className='flex flex-row gap-2 justify-start itemx-center mt-2'>
                        <Checkbox checked={showPassword} onChange={setShowPassword} className="rounded-md border border-primaryColor size-5 overflow-hidden">
                            {showPassword ?
                                <div className='size-5 bg-primaryColor text-secondaryTextColor center-of-div flex-col text-sm'><FontAwesomeIcon icon={faCheck} /></div>
                                : <div className='hidden'></div>}
                        </Checkbox>
                        <div>Show password</div>
                    </div>

                    <input className='mt-12 primary-color-button hover:secondary-color-button button-animation disabled:hover:primary-color-button disabled:cursor-not-allowed' type="submit" value="Sign In" disabled={!(validEmail && validPassword)} />
                </form>

                <div className='text-sm text-center mt-4 mb-8 hover:underline hover:text-primaryColor'>
                    <Link to={'/signup'} className='underline underline-offset-2'>Don't have an account? Sign up instead!</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
