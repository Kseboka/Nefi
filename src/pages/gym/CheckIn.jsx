import React from 'react'
import QrReader from 'react-web-qr-reader'
import { Layout } from '../../components'
import { Paper } from '@mantine/core'

const CheckIn = () => {
  const previewStyle = {
    height: 200,
    width: 200,
  }

  return (
    <Layout header='Check-In'>
      <Paper className='w-full h-full p-4 overflow-hidden bg-midnight' radius='md' withBorder>
        <div className='overflow-hidden rounded-xl h-3/4 md:w-1/3 md:h-1/3'>
          <QrReader
            className='w-full h-full'
            delay={500}
            onError={(error) => console.log(error)}
            onScan={(result) => console.log(result)}
          />
        </div>
      </Paper>
      <h1 className='text-5xl'>Hello</h1>
    </Layout>
  )
}

export default CheckIn
