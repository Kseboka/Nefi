import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth'
import supabase from '../../utils/supabase'
import { useForm } from '@mantine/form'
import { useViewportSize } from '@mantine/hooks'
import { addMonths, addYears, format } from 'date-fns'

import { Paper, TextInput, Select, Alert, Loader } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { parseISO } from 'date-fns/esm'
import { ProfilePic } from '../../components'

const AddMember = () => {
  const { user } = useAuth()
  const { width } = useViewportSize()
  const [size, setSize] = useState('md')
  const [membership, setMembership] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [file, setFile] = useState(null)

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  useEffect(() => {
    if (width > 375) setSize('md')
    else if (width > 768) setSize('lg')
    // else  setSize('')
  }, [width])

  const handleSubmit = async () => {
    const todayDate = format(new Date(), 'yyyy-MM-dd')
    const endDate = format(getEndDate(), 'yyyy-MM-dd')

    if (!form.isValid() || !membership || !file) return
    setLoading(true)

    try {
      const filePath = await uploadProfileImage(file, `${form.values.firstName}_${form.values.lastName}`)
      const imageUrl = await getProfileImage(filePath)

      const { data: newMember, error } = await supabase
        .from('members')
        .insert({
          name: `${form.values.firstName} ${form.values.lastName}`,
          email: form.values.email,
          phone: form.values.phone,
          membership_type: membership,
          gym_id: user?.id,
          membership_start_date: todayDate,
          membership_end_date: endDate,
          profile_url: imageUrl,
        })
        .select()

      console.log('Add New Member: ', newMember)
      if (error) throw error
      resetForm()
      setLoading(false)
      setShowAlert(true)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadProfileImage = async (fileUpload, fileName) => {
    const { data, error } = await supabase.storage.from('member-images').upload(`${user?.id}/${fileName}`, fileUpload, {
      upsert: false,
    })
    if (error) throw error
    return data.path
  }

  const getProfileImage = async (filePath) => {
    const { data, error } = await supabase.storage.from('member-images').getPublicUrl(`${filePath}`)
    if (error) throw error
    return data.publicUrl
  }

  const getEndDate = () => {
    const todayDate = format(new Date(), 'yyyy-MM-dd')
    let endDate

    if (membership === '1 Year') {
      endDate = addYears(parseISO(todayDate), 1)
    } else if (membership === '3 Months') {
      endDate = addMonths(parseISO(todayDate), 3)
    } else if (membership === '1 Month') {
      endDate = addMonths(parseISO(todayDate), 1)
    } else {
      console.error("Can't get end date")
      return
    }

    return endDate
  }

  const resetForm = () => {
    form.setFieldValue('firstName', '')
    form.setFieldValue('lastName', '')
    form.setFieldValue('email', '')
    form.setFieldValue('phone', '')
    setMembership('')
  }

  return (
    <>
      {showAlert ? (
        <div className='fixed right-0 flex justify-center w-full top-5'>
          <Alert
            className='w-1/2'
            icon={<IconAlertCircle size={16} />}
            title='Success!'
            color='teal'
            withCloseButton
            variant='filled'
            onClose={() => setShowAlert(false)}
          >
            Successfully Registered New Member
          </Alert>
        </div>
      ) : null}

      <Paper className='px-4 py-6 bg-midnight lg:py-8 lg:flex md:py-6' radius='md' withBorder>
        <div className='lg:w-1/2'>
          <ProfilePic file={file} setFile={setFile} />
        </div>
        {/* Form */}
        <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 md:w-full md:px-4 md:gap-8 '>
          <div className='flex flex-col gap-4 md:flex-row'>
            <TextInput
              label='First Name'
              size={size}
              className='w-full'
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
            />
            <TextInput
              label='Last Name'
              size={size}
              className='w-full'
              value={form.values.lastName}
              onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
            />
          </div>
          <div className='flex flex-col gap-4 md:flex-row'>
            <TextInput
              label='Email'
              size={size}
              className='w-full'
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />
            <TextInput
              label='Phone'
              size={size}
              className='w-full'
              value={form.values.phone}
              onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
            />
          </div>
          <Select
            required
            label='Membership'
            data={[
              { value: '1 Month', label: '1 Month' },
              { value: '3 Months', label: '3 Months' },
              { value: '1 Year', label: '1 Year' },
            ]}
            value={membership}
            onChange={setMembership}
            size={size}
          />

          <button
            type='submit'
            className='flex items-center justify-center gap-4 p-4 text-center border-2 border-white rounded-md md:text-xl hover:bg-white hover:text-midnight hover:border-none'
          >
            <p>Register</p>
            {loading && <Loader color='red' size={size} variant='dots' />}
          </button>
        </form>
      </Paper>
    </>
  )
}

export default AddMember
