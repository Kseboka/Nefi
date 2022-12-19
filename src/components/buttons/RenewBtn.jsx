import React from 'react'
import { Card, UnstyledButton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const RenewBtn = ({ member_id }) => {
  const navigate = useNavigate()

  return (
    <Card className='flex justify-center w-full h-32 lg:col-span-2'>
      <UnstyledButton className='w-full text-2xl text-center' onClick={() => navigate(`/gym/member/renew/${member_id}`)}>
        Renew Membership
      </UnstyledButton>
    </Card>
  )
}

export default RenewBtn
