import React from 'react'
import { Card, Paper } from '@mantine/core'
import OverviewCard from './OverviewCard'
import { IconFriends, IconUserPlus, IconChevronsDown } from '@tabler/icons'

const Overview = () => {
  return (
    <Paper className='bg-midnight py-6 px-6 flex flex-col gap-4 md:flex-row' withBorder shadow='lg' radius='md'>
      <OverviewCard whatFor='Total Members' bgColor='bg-blue-500' icon={<IconFriends className='h-10 w-10' />} />
      <OverviewCard whatFor='New Members' bgColor='bg-emerald-500' icon={<IconUserPlus className='h-10 w-10' />} />
      <OverviewCard whatFor='Present Today' bgColor='bg-orange-500' icon={<IconChevronsDown className='h-10 w-10' />} />
    </Paper>
  )
}

export default Overview
