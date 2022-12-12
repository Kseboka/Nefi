import { Card, Paper } from '@mantine/core'
import React from 'react'
import { Navbar, DashHeader, Overview, RevenueOverview } from '../../components'

const Gym = () => {
  return (
    <div className='relative w-full h-full px-5 py-7'>
      <div className='md:ml-36 md:mt-8'>
        <DashHeader who='Gym' />
        <Overview />
        <RevenueOverview />
      </div>
      <Navbar />
    </div>
  )
}

export default Gym
