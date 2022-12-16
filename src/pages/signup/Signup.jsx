import React from 'react'
import supabase from '../../utils/supabase'
import { useForm } from '@mantine/form'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Divider, Paper, PasswordInput, TextInput, UnstyledButton } from '@mantine/core'

const Signup = () => {
  const { user_id } = useParams()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      name: '',
      location: '',
      phone: '',
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  const handleSubmit = async (e) => {
    console.log('lokids')
    if (!form.isValid()) return

    try {
      const { data, err } = await supabase.auth.signUp({
        email: form.values.email,
        password: form.values.password,
      })
      console.log('sign up data: ', data)

      if (err) throw err

      const { data: gym, error } = await supabase
        .from('gyms')
        .insert({
          id: data.user.id,
          name: form.values.name,
          location: form.values.location,
          email: form.values.email,
          phone_number: form.values.phone,
        })
        .select()

      console.log('gym: ', gym)

      if (error) throw error
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-full px-4'>
      <Paper className='w-full p-6 text-white bg-midnight' withBorder shadow='lg' radius='md'>
        <h1>{user_id === 'member' ? 'Member Portal Registration' : 'Gym Registration'}</h1>
        <Divider my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 text-white'>
          <TextInput
            required
            label='Gym Name'
            placeholder='gym'
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            size='md'
          />
          <TextInput
            required
            label='City'
            placeholder='Addis Ababa'
            onChange={(event) => form.setFieldValue('location', event.currentTarget.value)}
            size='md'
          />
          <TextInput
            required
            label='Phone Number'
            placeholder='0991243214'
            onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
            size='md'
          />
          <TextInput
            required
            label='Email'
            placeholder='you@email.com'
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            size='md'
          />
          <PasswordInput
            required
            label='Password'
            placeholder='secret'
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            size='md'
          />
          <div className='flex justify-between'>
            <Link to={`/login/${user_id}`} className='text-xs text-gray-500 underline underline-offset-4'>
              Have an account, Login
            </Link>
            <UnstyledButton type='submit' size='sm' className='px-4 py-1 font-medium text-white rounded-md bg-emerald-400'>
              Submit
            </UnstyledButton>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default Signup
