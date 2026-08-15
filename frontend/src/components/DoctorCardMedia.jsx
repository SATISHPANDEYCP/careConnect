import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
export const DoctorImage = ({ src, name }) => {
  const [imageStatus, setImageStatus] = useState('loading')

  useEffect(() => {
    setImageStatus('loading')
  }, [src])

  return (
    <div className='relative aspect-square overflow-hidden bg-[#EAEFFF]'>
      {imageStatus === 'loading' && (
        <div className='absolute inset-0 flex items-center justify-center bg-[#EAEFFF] animate-pulse' role='status' aria-label={`Loading ${name}'s photo`}>
          <div className='h-10 w-10 rounded-full border-4 border-[#cbd4ff] border-t-primary animate-spin'></div>
        </div>
      )}

      {imageStatus === 'error' ? (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-gray-500'>
          <svg className='h-12 w-12 text-[#aebcff]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0 17.9 17.9 0 0 1-7.5 1.65A17.9 17.9 0 0 1 4.5 20.1Z' />
          </svg>
          <span>Image unavailable</span>
        </div>
      ) : (
        <img
          className={`h-full w-full object-cover transition-opacity duration-300 ${imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          src={src}
          alt={`${name} profile`}
          onLoad={() => setImageStatus('loaded')}
          onError={() => setImageStatus('error')}
        />
      )}
    </div>
  )
}

export const DoctorCardSkeleton = () => (
  <div className='overflow-hidden rounded-xl border border-[#C9D8FF] animate-pulse' role='status' aria-label='Loading doctor'>
    <div className='aspect-square bg-[#EAEFFF]'></div>
    <div className='space-y-3 p-4'>
      <div className='h-4 w-24 rounded bg-gray-200'></div>
      <div className='h-5 w-3/4 rounded bg-gray-200'></div>
      <div className='h-4 w-1/2 rounded bg-gray-200'></div>
    </div>
  </div>
)
