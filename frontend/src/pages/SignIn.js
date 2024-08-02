import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div className='h-screen w-screen min-w-screen min-h-screen center-of-div bg-appGreen text-appBlack'>
            <div className='w-10/12 h-fit max-w-[450px] max-h-fit min-w-80 min-h-96 p-8 rounded-3xl bg-appGray-1 flex flex-col'>
                <img
                    className='w-10 h-10 self-center'
                    src={require(`../assets/applogo.png`)}
                    alt="app logo"
                />
                <p className='text-3xl font-bold font-sans my-6'>Sign In</p>
                <form className='flex flex-col'>
                    <label className='form-label'>Email: </label>
                    <input className='form-text-input' type='text' name='email' />
                    <label className='form-label'>Password: </label>
                    <input className='form-text-input' type='password' name='user_password' />
                    <input className='primary-green-button hover:secondary-green-button mt-8' type="submit" value="Sign In" />
                </form>
                <div className='text-sm text-center mt-4 mb-8 hover:underline hover:text-appGreen'>
                    <Link to={'/signup'}>Don't have an account? Sign up instead!</Link>
                </div>

            </div>
        </div>
    )
}

export default SignIn
