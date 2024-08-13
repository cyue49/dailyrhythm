import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-screen w-screen p-8 center-of-div flex-col gap-8 bg-mainBgColor'>
            <div className='p-8 center-of-div flex-col gap-8 size-full page-appear-animation'>
                <img
                    className='size-20'
                    src={require(`../assets/applogo.png`)}
                    alt="app logo"
                />

                <h3 className='text-2xl font-bold font-sans text-primaryTextColor'>Daily Rhythm</h3>

                <p className='text-center w-5/6 md:w-2/4 max-w-md'>Daily Rhythm helps you track, maintain, and manage daily habits and routines towards a healthy life rhythm. </p>

                <Link to={'/signin'} className='primary-color-button hover:secondary-color-button focus:secondary-color-button hover:scale-110 mt-4 button-animation'>Get Started!</Link>
            </div>

        </div>
    )
}

export default Home
