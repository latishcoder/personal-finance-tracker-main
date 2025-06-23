import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <div className='bg-gray-700'>
            <Outlet />
        </div>
    )
}

export default RootLayout
