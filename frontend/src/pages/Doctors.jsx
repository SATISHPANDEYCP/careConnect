import { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const DoctorImage = ({ src, name }) => {
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

const DoctorCardSkeleton = () => (
  <div className='overflow-hidden rounded-xl border border-[#C9D8FF] animate-pulse' role='status' aria-label='Loading doctor'>
    <div className='aspect-square bg-[#EAEFFF]'></div>
    <div className='space-y-3 p-4'>
      <div className='h-4 w-24 rounded bg-gray-200'></div>
      <div className='h-5 w-3/4 rounded bg-gray-200'></div>
      <div className='h-4 w-1/2 rounded bg-gray-200'></div>
    </div>
  </div>
)

const Doctors = () => {

  const { speciality } = useParams()

  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors, isDoctorsLoading } = useContext(AppContext)

  const filterDoc = useMemo(
    () => speciality ? doctors.filter(doc => doc.speciality === speciality) : doctors,
    [doctors, speciality]
  )

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {isDoctorsLoading && Array.from({ length: 6 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))}

          {!isDoctorsLoading && filterDoc.map((item) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={item._id}>
              <DoctorImage src={item.image} name={item.name} />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
