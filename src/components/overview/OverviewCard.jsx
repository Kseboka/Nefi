import React from 'react'
import { Card } from '@mantine/core'

const OverviewCard = ({ whatFor, bgColor, icon }) => {
  return (
    <Card className={` rounded-sm w-full ${bgColor} text-slate-100 flex items-center gap-8 shadow-md`}>
      {icon}
      <div>
        <h3 className='font-black'>{whatFor}</h3>
        <p>50</p>
      </div>
    </Card>
  )
}

export default OverviewCard

// border border-neutral-700
