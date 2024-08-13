import React from 'react'
import BottomBar from './BottomBar'
import TopBar from './TopBar'

const Loading = () => {
    return (
        <div className='h-screen w-screen flex flex-col items-center bg-webBgColor text-primaryTextColor'>
            <TopBar icons={['']} title={'Loading'} />
            <div className='w-full max-w-4xl h-screen bg-mainBgColor overflow-y-hidden flex flex-col gap-4 my-[56px]'>
                <div>Loading...</div>
            </div>
            <BottomBar current={2} />
        </div>
    )
}

export default Loading
