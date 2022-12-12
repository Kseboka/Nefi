import React from 'react'
import QrReader from 'react-web-qr-reader'
import { Layout, MemberCard } from '../../components'
import { Paper } from '@mantine/core'

const CheckIn = () => {
  const previewStyle = {
    height: 200,
    width: 200,
  }

  return (
    <Layout header='Check-In'>
      <Paper
        className='flex flex-col w-full gap-4 p-4 overflow-hidden md:h-auto md:flex-row bg-midnight'
        radius='md'
        withBorder
      >
        <div className='overflow-hidden rounded-md md:h-auto md:w-2/5'>
          <QrReader
            delay={500}
            resolution={200}
            // onError={(error) => console.log(error)}
            onScan={(result) => console.log(result)}
          />
        </div>
        <div className='md:w-3/5'>
          <MemberCard />
        </div>
      </Paper>
    </Layout>
  )
}

export default CheckIn
