import React from 'react'
import { useViewportSize } from '@mantine/hooks'
import { NavLink } from '../../components'
import { IconHome2, IconUsers, IconFocusCentered, IconReceipt2, IconUserCircle } from '@tabler/icons'
import { Paper } from '@mantine/core'

const Navbar = () => {
  const { width } = useViewportSize()

  return (
    <div className='fixed bottom-0 left-0 w-full px-4 pb-4 md:top-0 md:h-full md:py-4'>
      <Paper className='w-full px-6 py-3 bg-midnight md:h-full md:w-fit' radius='md' withBorder>
        <div className='items-center justify-center hidden w-16 h-16 px-4 bg-white rounded-full md:flex'>
          <span className='text-black'>Nefi</span>
        </div>
        <div className='flex justify-between gap-2 md:flex-col'>
          <NavLink icon={<IconHome2 className='' />} label='Home' />
          <NavLink icon={<IconFocusCentered className='' />} label='Scanner' />
          <NavLink icon={<IconUsers className='' />} label='Members' />
          <NavLink icon={<IconReceipt2 className='' />} label='Billing' />
        </div>
        <div className='fixed top-0 right-0 flex p-3 mt-6 mr-4 border rounded-full bg-midnight border-neutral-700 md:static md:border-0 md:bg-inherit'>
          <NavLink icon={<IconUsers className='w-6 h-6' />} label={width < 768 ? '' : 'Account'} />
        </div>
      </Paper>
    </div>
  )
}

export default Navbar
