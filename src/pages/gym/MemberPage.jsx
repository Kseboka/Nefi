import { useEffect, useState } from 'react'
import supabase from '../../utils/supabase'
import { isAfter, parseISO, format } from 'date-fns'

import { Paper, UnstyledButton } from '@mantine/core'
import { IconUserCheck, IconUserPlus, IconUserX } from '@tabler/icons'
import { MemberTable, OverviewCard } from '../../components'
import { Link } from 'react-router-dom'

const MemberPage = () => {
  const [members, setMembers] = useState(null)
  const [activeMembers, setActiveMembers] = useState(null)
  const [inactiveMembers, setInactiveMembers] = useState(null)

  useEffect(() => {
    getMembers()
  }, [])

  const getMembers = async () => {
    try {
      const { data: members, error } = await supabase.from('members').select()
      if (error) throw error
      // console.log(members)
      setMembers(members)
      setActiveMembers(getActiveMembers(members))
      setInactiveMembers(members.length - getActiveMembers(members))
    } catch (error) {
      console.log(error)
    }
  }
  const getActiveMembers = (members) => {
    const todayDate = format(new Date(), 'yyyy-MM-dd')

    const activeCount = members.filter((member) => isAfter(parseISO(member.membership_end_date), parseISO(todayDate)))
    // console.log('active members: ', activeCount)

    return activeCount.length
  }

  return (
    <div className='flex flex-col h-full gap-8'>
      <Paper className='flex flex-col w-full gap-4 p-4 md:flex-row bg-midnight' radius='md' withBorder>
        <OverviewCard
          whatFor='Active Memberships'
          bgColor='bg-emerald-500'
          icon={<IconUserCheck className='w-10 h-10 md:w-24 md:h-24' />}
          stat={activeMembers}
        />
        <OverviewCard
          whatFor='Inactive Memberships'
          bgColor='bg-red-500'
          icon={<IconUserX className='w-10 h-10 md:w-24 md:h-24' />}
          stat={inactiveMembers}
        />
      </Paper>

      <Paper
        className='flex flex-col py-4 w-full overflow-scroll h-96 md:min-h-fit md:max-h-[3/5] bg-midnight '
        radius='md'
        withBorder
      >
        <div className=' flex items-center justify-between w-full px-4'>
          <h2 className='my-2 text-2xl font-black '>Member List</h2>
          <Link to='/gym/members/add-member' className=' bg-midnight'>
            <div className='py-1 rounded-md border-1 border-neutral-400'>
              <IconUserPlus className='w-8 h-8 text-neutral-100' />
            </div>
          </Link>
        </div>
        <div className='w-full px-4'>{members && <MemberTable members={members} />}</div>
      </Paper>
    </div>
  )
}

export default MemberPage
