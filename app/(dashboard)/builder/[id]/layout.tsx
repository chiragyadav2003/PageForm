import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full flex flex-grow mx-auto '>
            {children}
        </div>
    )
}

export default Layout