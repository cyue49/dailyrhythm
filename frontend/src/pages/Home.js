import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-screen w-screen p-8 center-of-div flex-col gap-8 bg-appWhite'>
            <img
                className='w-20 h-20'
                src={require(`../assets/applogo.png`)}
                alt="app logo"
            />

            <h3 className='text-2xl font-bold font-sans text-appGreen'>Daily Rhythm</h3>

            <p className='text-center w-5/6 md:w-2/4 max-w-md'>Daily Rhythm helps you track, maintain, and manage daily habits and routines towards a healthy life rhythm. </p>

            <Link to={'/signin'} className='primary-green-button hover:secondary-green-button focus:secondary-green-button mt-2'>Get Started!</Link>
        </div>
    )
}

export default Home
