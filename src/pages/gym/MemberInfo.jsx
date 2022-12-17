import React from 'react'
import { MemberCard } from '../../components'
import { Avatar } from '@mantine/core'

const MemberInfo = () => {
  return (
    <MemberCard>
      <Avatar src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80' />
      <div>
        <h1>Kalkidan Seboka</h1>
      </div>
    </MemberCard>
  )
}

/*
 name
 email
 profile_url
 phone
 membership_type
 membership_start_date
 membership_end_date
 last_present
*/

export default MemberInfo
