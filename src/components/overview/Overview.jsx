import { useState, useEffect } from 'react'
import supabase from '../../utils/supabase'
import { differenceInDays, format, parseISO } from 'date-fns'

import { Paper } from '@mantine/core'
import OverviewCard from './OverviewCard'
import { IconFriends, IconUserPlus, IconChevronsDown } from '@tabler/icons'

const Overview = ({ members }) => {
  const [totalMembers, setTotalMembers] = useState(null)
  const [newMembers, setNewMembers] = useState(null)

  useEffect(() => {
    getMembers()
  }, [])

  const getMembers = async () => {
    try {
      const { data: members, error } = await supabase.from('members').select()
      if (error) throw error
      // console.log(members)
      setTotalMembers(members.length)
      setNewMembers(getNewMembers(members))
    } catch (error) {
      console.log(error)
    }
  }

  const getNewMembers = (members) => {
    const todayDate = format(new Date(), 'yyyy-MM-dd')
    const newMembers = members.filter((member) => {
      if (differenceInDays(parseISO(todayDate), parseISO(member.membership_start_date)) <= 30) return member
    })

    return newMembers.length
  }

  return (
    <Paper className='flex flex-col gap-4 px-6 py-6 bg-midnight md:flex-row' withBorder shadow='lg' radius='md'>
      <OverviewCard
        whatFor='Total Members'
        bgColor='bg-blue-500'
        icon={<IconFriends className='w-10 h-10 md:h-24 md:w-24' />}
        stat={totalMembers}
      />
      <OverviewCard
        whatFor='New Members'
        bgColor='bg-emerald-500'
        icon={<IconUserPlus className='w-10 h-10 md:h-24 md:w-24' />}
        stat={newMembers}
      />
      <OverviewCard
        whatFor='Present Today'
        bgColor='bg-orange-500'
        icon={<IconChevronsDown className='w-10 h-10 md:h-24 md:w-24' />}
      />
    </Paper>
  )
}

export default Overview
