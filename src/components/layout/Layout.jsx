import React, { useEffect, useState } from 'react'
import Navbar from '../navigation/Navbar'
import DashHeader from '../header/DashHeader'
import { useAuth } from '../../contexts/auth'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

const Layout = () => {
  const { isAuth } = useAuth()
  const location = useLocation()

  return (
    <div className='h-full px-6 py-7 md:pb-0'>
      <div className='pb-28 md:ml-40 lg:mr-12 md:h-full md:pb-8'>
        <DashHeader who={location.pathname} />
        {!isAuth && <Navigate to='/login' />}
        <Outlet />
      </div>
      <Navbar />
    </div>
  )
}

export default Layout
