import { useEffect, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'
import { Tooltip, UnstyledButton } from '@mantine/core'

const NavLink = ({ label, icon }) => {
  const [labelPosition, setLabelPosition] = useState('top')
  const { width } = useViewportSize()

  useEffect(() => {
    if (width > 425) setLabelPosition('right')
    else setLabelPosition('top')
  }, [width])

  return (
    <Tooltip label={label} position={labelPosition} transitionDuration={0}>
      <UnstyledButton className='flex flex-col items-center justify-center gap-2 '>
        {icon}
        <span className='text-sm md:hidden'>{label}</span>
      </UnstyledButton>
    </Tooltip>
  )
}

export default NavLink
