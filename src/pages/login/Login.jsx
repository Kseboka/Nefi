import React from 'react'
import supabase from '../../utils/supabase'
import { useForm } from '@mantine/form'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'

import { Divider, Paper, PasswordInput, TextInput, UnstyledButton } from '@mantine/core'

const Login = () => {
  const { isAuth, user } = useAuth()

  const { user_id } = useParams()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  const handleSubmit = async () => {
    if (!form.isValid()) return

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.values.email,
        password: form.values.password,
      })

      if (error) throw error
      navigate(`/${user_id}`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-full px-4'>
      {isAuth && <Navigate to='/gym' />}
      <Paper className='w-full p-6 text-white bg-midnight' withBorder shadow='lg' radius='md'>
        <h1>{user_id === 'member' ? 'Member Login' : 'Gym Login'}</h1>
        <Divider my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 text-white'>
          <TextInput
            required
            label='Email'
            placeholder='you@email.com'
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            size='lg'
          />
          <PasswordInput
            required
            label='Password'
            placeholder='secret'
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            size='lg'
          />
          <div className='flex justify-between'>
            <Link to={`/signup/${user_id}`} className='text-xs text-gray-500 underline underline-offset-4'>
              Don't have an account, register
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

export default Login
