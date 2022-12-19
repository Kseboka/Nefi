import { useEffect, useState } from 'react'
import supabase from '../../utils/supabase'
import { Card, List } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { isAfter, parseISO, format } from 'date-fns'
import { QRCodeSVG } from 'qrcode.react'
import { MemberCard, RenewBtn } from '../../components'

const MemberInfo = () => {
  const { member_id } = useParams()
  const [member, setMember] = useState({
    name: '',
    membership: '',
    lastPresent: ' ',
    expiration: '',
    email: '',
    phone: '',
    profilePic: '',
  })
  const [isMember, setIsMember] = useState(null)

  const { name, membership, lastPresent, expiration, email, phone, profilePic } = member

  useEffect(() => {
    getMembers()
  }, [])

  const getMembers = async () => {
    try {
      const { data: member, error } = await supabase.from('members').select().eq('id', member_id).select()
      if (error) throw error
      // console.log(member[0])
      if (member) {
        setMember(() => {
          return {
            name: member[0].name,
            profilePic: member[0].profile_url,
            membership: member[0].membership_type,
            lastPresent: member[0].last_present,
            expiration: member[0].membership_end_date,
            email: member[0].email,
            phone: member[0].phone,
          }
        })
        setIsMember(getIsActiveMember(member[0]))
      }
      // setTotalMembers(members.length)
      // setNewMembers(getNewMembers(members))
    } catch (error) {
      console.log(error)
    }
  }

  const getIsActiveMember = (member) => {
    const todayDate = format(new Date(), 'yyyy-MM-dd')

    const isActiveMember = isAfter(parseISO(member.membership_end_date), parseISO(todayDate))
    console.log(isActiveMember)
    return isActiveMember
  }

  return (
    <>
      <div className='flex flex-col justify-center w-full gap-4 lg:grid lg:grid-cols-2'>
        <MemberCard isMember={isMember} member={member} />
        <Card className='flex flex-col items-center justify-center p-8 bg-blue-400 lg:mt-0'>
          <h1 className='3xl font-black text-black'>{member.name}</h1>
          <QRCodeSVG className='rounded-md w-44 h-44 lg:w-60 lg:h-60' value={`${member_id}`} size='400' />
        </Card>
        <RenewBtn member_id={member_id} />
      </div>
    </>
  )
}

/*
 name::
 email 
 profile_url ::
 phone 
 membership_type
 membership_start_date
 membership_end_date
 last_present
 birthdate
*/

export default MemberInfo
