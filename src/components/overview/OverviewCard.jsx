import React from 'react'
import { Card } from '@mantine/core'

const OverviewCard = ({ whatFor, bgColor, icon, stat }) => {
  return (
    <Card className={` rounded-sm w-full ${bgColor} text-slate-100 flex items-center gap-8 shadow-md`}>
      {icon}
      <div>
        <h2 className=' md:text-4xl md:font-bold'>{stat}</h2>
        <p className='font-medium md:text-2xl'>{whatFor}</p>
      </div>
    </Card>
  )
}

export default OverviewCard

// border border-neutral-700
