import React from 'react'
import { useViewportSize } from '@mantine/hooks'
import { NavLink } from '../../components'
import { IconHome2, IconUsers, IconFocusCentered, IconReceipt2, IconBarbell } from '@tabler/icons'
import { Paper, Divider } from '@mantine/core'

const Navbar = () => {
  const { width } = useViewportSize()

  return (
    <div className='fixed bottom-0 left-0 z-20 w-full px-4 pb-4 md:top-0 md:h-full md:py-8 md:ml-6 md:w-fit'>
      <Paper
        className='w-full px-6 py-3 bg-midnight md:h-full md:w-fit md:flex md:flex-col md:justify-between md:items-center md:px-6'
        radius='md'
        withBorder
      >
        <div className='items-center justify-center hidden w-16 h-16 px-4 bg-white rounded-full md:flex mt-14'>
          <span className='text-black'>Nefi</span>
        </div>
        <div className='flex justify-between gap-2 md:flex-col md:gap-12'>
          <NavLink icon={<IconHome2 className='md:w-8 md:h-8' />} label='Home' link='/gym' />
          <NavLink icon={<IconFocusCentered className='md:w-8 md:h-8' />} label='Scanner' link='/gym/checkin' />
          <NavLink icon={<IconUsers className='md:w-8 md:h-8' />} label='Members' link='/gym/members' />
          <NavLink icon={<IconReceipt2 className='md:w-8 md:h-8' />} label='Billing' />
        </div>
        <div className='fixed top-0 right-0 z-20 flex items-center justify-center p-3 mt-6 mr-4 border rounded-full bg-midnight border-neutral-700 md:static md:border-0 md:bg-inherit md:mr-0 md:mt-0 md:mb-6'>
          <NavLink icon={<IconBarbell className='w-6 h-6 md:h-8 md:w-8' />} label={width < 768 ? '' : 'Account'} />
        </div>
      </Paper>
    </div>
  )
}

export default Navbar

// link='/gym/members'
// link='/gym/billing'
