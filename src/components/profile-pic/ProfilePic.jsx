import React, { useCallback, useRef, useState, useId } from 'react'
import { FileInput } from '@mantine/core'
import download from 'downloadjs'
import Webcam from 'react-webcam'
import { IconUpload } from '@tabler/icons'

const ProfilePic = ({ file, setFile }) => {
  const [img, setImg] = useState(null)
  const webcamRef = useRef(null)
  const fileId = useId()

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: 'user',
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImg(imageSrc)
    download(imageSrc, `${fileId}.png`)
  }, [webcamRef])

  const handleRetake = () => {
    setImg(null)
    setFile(null)
  }
  return (
    <div className='flex flex-col items-center gap-4'>
      {img === null ? (
        <>
          <div className='rounded-md'>
            <Webcam
              audio={false}
              mirrored={true}
              height={400}
              width={400}
              ref={webcamRef}
              screenshotFormat='image/png'
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture} className='px-6 py-2 mb-4 border-2 border-white rounded-md'>
            Capture photo
          </button>
        </>
      ) : (
        <>
          <img src={img} alt='screenshot' />
          <div className='flex items-center justify-center gap-4 mb-6'>
            <button onClick={handleRetake} className='px-6 py-2 border-2 border-white rounded-md h-14'>
              Retake
            </button>
            <FileInput
              value={file}
              onChange={setFile}
              icon={<IconUpload size={14} />}
              placeholder='upload'
              className='w-32 h-full rounded-md'
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProfilePic
