import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-screen w-screen p-8 center-of-div flex-col gap-8 bg-appWhite'>
            <div className='p-8 center-of-div flex-col gap-8 size-full'>
                <img
                    className='size-20 animate-bounce'
                    src={require(`../assets/applogo.png`)}
                    alt="app logo"
                />

                <h3 className='text-2xl font-bold font-sans text-appGreen'>Daily Rhythm</h3>

                <p className='text-center w-5/6 md:w-2/4 max-w-md'>Daily Rhythm helps you track, maintain, and manage daily habits and routines towards a healthy life rhythm. </p>

                <Link to={'/signin'} className='primary-green-button hover:secondary-green-button focus:secondary-green-button hover:scale-110 mt-4 button-animation'>Get Started!</Link>
            </div>

        </div>
    )
}

export default Home
