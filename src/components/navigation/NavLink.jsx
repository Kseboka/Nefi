import { useEffect, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'
import { Tooltip, UnstyledButton } from '@mantine/core'
import { Link } from 'react-router-dom'

const NavLink = ({ label, icon, link }) => {
  const [labelPosition, setLabelPosition] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const { width } = useViewportSize()

  useEffect(() => {
    // if (width < 425) setLabelPosition('')
    // else setLabelPosition('right')
    if (width < 425) setIsDisabled(true)
    else setIsDisabled(false)
  }, [width])

  return (
    <Tooltip label={label} position='right' disabled={isDisabled} transitionDuration={0}>
      <Link to={link}>
        <UnstyledButton className='flex flex-col items-center justify-center gap-1'>
          {icon}
          <span className='text-sm md:hidden'>{label}</span>
        </UnstyledButton>
      </Link>
    </Tooltip>
  )
}

export default NavLink
