import React, { Children } from 'react'
import Navbar from '../navigation/Navbar'
import DashHeader from '../header/DashHeader'

const Layout = ({ children, header }) => {
  return (
    <>
      <div className='h-full px-6 py-7 md:pb-0'>
        <div className='pb-28 md:ml-40 md:mr-14 md:h-full md:pb-0'>
          <DashHeader who={header} />
          {children}
        </div>
        <Navbar />
      </div>
    </>
  )
}

export default Layout
