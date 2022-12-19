import { useEffect, useState } from 'react'
import supabase from '../../utils/supabase'
import { isAfter, parseISO, format } from 'date-fns'
import QrReader from 'react-web-qr-reader'
import { useAuth } from '../../contexts/auth'

import { MemberCard, RenewBtn } from '../../components'
import { Paper, Skeleton, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'

const CheckIn = () => {
  const { user } = useAuth()
  const [memberId, setMemberId] = useState('')
  const [isMember, setIsMember] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [member, setMember] = useState({
    name: '',
    membership: '',
    lastPresent: ' ',
    expiration: '',
    email: '',
    phone: '',
    profilePic: '',
  })

  const getMember = async (memberId) => {
    setShowSkeleton(true)
    try {
      // Get member data from the 'members' table
      const { data: memberData, error } = await supabase.from('members').select().eq('id', memberId)
      if (error) throw error

      // Set member data in state
      setMember({
        name: memberData[0].name,
        profilePic: memberData[0].profile_url,
        membership: memberData[0].membership_type,
        lastPresent: memberData[0].last_present,
        expiration: memberData[0].membership_end_date,
        email: memberData[0].email,
        phone: memberData[0].phone,
      })

      // Check if member is active
      const isActive = await getIsActiveMember(memberData[0].membership_end_date)
      setIsMember(isActive)

      // Update the member's last present date and add attendance for today if active
      if (isActive) {
        await handlePresent(memberData[0])
        await handleAttendance(memberData[0])
      }

      setShowSkeleton(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getIsActiveMember = async (memberEndDate) => {
    const todayDate = format(new Date(), 'yyyy-MM-dd')
    const isActiveMember = isAfter(parseISO(memberEndDate), parseISO(todayDate))
    return isActiveMember
  }

  const handlePresent = async (member) => {
    try {
      // Check if member is active
      const isActive = await getIsActiveMember(member.membership_end_date)
      if (!isActive) return

      // Get today's date
      const todayDate = format(new Date(), 'yyyy-MM-dd')

      // Check if member has already checked in today
      if (member.last_present === todayDate) return

      // Update the member's last present date
      await supabase.from('members').update({ last_present: todayDate }).eq('id', member.id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAttendance = async (member) => {
    try {
      // Get attendance data for today
      const todayDate = format(new Date(), 'yyyy-MM-dd')
      const { data: attendanceData, error } = await supabase.from('attendance').select().eq('date', todayDate)
      if (member.last_present === todayDate) return

      // If attendance data exists for today, add member to the list of attendants
      if (attendanceData.length > 0) {
        const attendants = [...attendanceData[0].attendants, member.name]
        await supabase.from('attendance').update({ attendants }).eq('id', attendanceData[0].id)
      }
      // If no attendance data exists for today, create a new attendance record with the member as the only attendant
      else {
        await supabase.from('attendance').insert({
          gym_id: user?.id,
          attendants: [member.name],
          date: todayDate,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* {showAlert ? (
        <div className='fixed right-0 flex justify-center w-full top-5'>
          <Alert
            className='w-1/2'
            icon={<IconAlertCircle size={16} />}
            title=''
            color='red'
            withCloseButton
            variant='filled'
            onClose={() => setShowAlert(false)}
          >
            {member.name} was present today
          </Alert>
        </div>
      ) : null} */}
      <Paper
        className='flex flex-col w-full gap-4 p-4 mb-4 overflow-hidden md:h-fit md:flex-row bg-midnight'
        radius='md'
        withBorder
      >
        <div className='overflow-hidden rounded-md md:h-auto md:w-3/5'>
          <QrReader
            delay={100}
            resolution={200}
            onError={(error) => console.log(error)}
            onScan={(result) => {
              getMember(result.data)
              setMemberId(result.data)
            }}
          />
        </div>
        <Skeleton visible={showSkeleton}>
          <MemberCard isMember={isMember} member={member} />
        </Skeleton>
      </Paper>
      <RenewBtn member_id={memberId} />
    </>
  )
}

export default CheckIn
