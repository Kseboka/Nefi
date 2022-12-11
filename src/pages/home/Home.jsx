import React from 'react'
import { HomeHeader, LinkBtn } from '../../components'
import { Center } from '@mantine/core'

const Home = () => {
  return (
    <div className='w-screen h-screen font-black bg-russian text-slate-200'>
      <Center className='flex flex-col w-full gap-4 p-5 text-4xl leading-none text-center h-4/5'>
        <HomeHeader />
        <div className='flex gap-4 mt-2'>
          <LinkBtn link='/login/gym' btnLabel='Gym' />
          <LinkBtn link='/login/member' btnLabel='Member' />
        </div>
      </Center>
    </div>
  )
}

export default Home
