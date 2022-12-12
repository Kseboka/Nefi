import React, { Children } from 'react'
import Navbar from '../navigation/Navbar'
import DashHeader from '../header/DashHeader'

const Layout = ({ children, header }) => {
  return (
    <div className='relative w-full h-full px-5 md:pr-28 py-7'>
      <div className=' md:ml-48'>
        <DashHeader who={header} />
        {children}
      </div>
      <Navbar />
    </div>
  )
}

export default Layout
