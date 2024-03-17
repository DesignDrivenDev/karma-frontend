import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

function Layout({ children }: PropsWithChildren) {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Head>
                <title>Karma Realty</title>
            </Head>

            
            {children}
            <Footer />
        </div>
    )
}

export default Layout