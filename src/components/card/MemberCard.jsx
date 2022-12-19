import { Card, Avatar, List } from '@mantine/core'
import { IconMail, IconPhone, IconCake } from '@tabler/icons'

import React from 'react'

const MemberCard = ({ member, isMember }) => {
  return (
    <Card className={`px-6 text-white shadow-lg w-full  lg:py-12 ${isMember ? 'bg-emerald-600' : 'bg-red-600'} lg:px-28`}>
      <div className='flex flex-col items-center gap-2 mb-8 '>
        <div className='border-8 border-white rounded-full lg:rounded-md'>
          <Avatar className='rounded-full w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 lg:rounded-md' src={member.profilePic} />
        </div>
        <div>
          <h1 className='text-3xl font-bold md:text-4xl '>{member.name}</h1>
          <p className='text-lg font-semibold text-center lg:text-2xl'>{member.membership}</p>
        </div>
      </div>

      <div className='gap-12 lg:flex lg:justify-center lg:mb-6'>
        <div className='flex items-center justify-between lg:flex-col lg:gap-2'>
          <h3 className='text-lg font-bold md:text-xl lg:text-2xl'>Last Present</h3>
          <p className='lg:text-lg'>{member.lastPresent ? member.lastPresent : 'N/A'}</p>
        </div>
        <div className='flex items-center justify-between lg:flex-col lg:gap-2 '>
          <h3 className='text-lg font-bold md:text-xl lg:text-2xl'>Expiration</h3>
          <p className='lg:text-lg'>{member.expiration}</p>
        </div>
      </div>

      <div className='mt-4'>
        <h2 className='mb-4 text-2xl font-bold md:text-3xl lg:text-center'>Member Info</h2>
        <List className='flex flex-col flex-wrap gap-1 text-white md:text-lg lg:flex-row lg:justify-center lg:gap-8'>
          <List.Item icon={<IconMail />} className='lg:text-md'>
            {member.email}
          </List.Item>
          <List.Item icon={<IconPhone />} className='lg:text-md'>
            {member.phone}
          </List.Item>
          <List.Item icon={<IconCake />} className='lg:text-md'>
            Birthdate
          </List.Item>
        </List>
      </div>
    </Card>
  )
}

export default MemberCard
