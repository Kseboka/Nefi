import React from 'react'
import { UnstyledButton } from '@mantine/core'
import { Link } from 'react-router-dom'

const LinkBtn = ({ link, btnLabel }) => {
  return (
    <UnstyledButton className='px-4 py-2 rounded-md outline outline-1 outline-slate-200 text-slate-200 max-w-52 hover:bg-neutral-900 hover:outline-4 '>
      <Link to={link}>{btnLabel}</Link>
    </UnstyledButton>
  )
}

export default LinkBtn
