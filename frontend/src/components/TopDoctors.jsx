import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { DoctorCardSkeleton, DoctorImage } from './DoctorCardMedia'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors, isDoctorsLoading } = useContext(AppContext)
    const topDoctors = doctors.slice(0, 10)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {isDoctorsLoading && Array.from({ length: 5 }).map((_, index) => (
                    <DoctorCardSkeleton key={index} />
                ))}

                {!isDoctorsLoading && topDoctors.length === 0 && (
                    <div className='col-span-full flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-[#C9D8FF] bg-[#F8F9FF] px-6 text-center'>
                        <svg className='mb-4 h-14 w-14 text-[#9DADFF]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0M18 9.75l3 3m0-3-3 3' />
                        </svg>
                        <p className='text-lg font-medium'>No doctors available</p>
                        <p className='mt-1 text-sm text-gray-500'>There are currently no doctors listed. Please check again later.</p>
                    </div>
                )}

                {!isDoctorsLoading && topDoctors.map((item) => (
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
            {!isDoctorsLoading && topDoctors.length > 0 && (
                <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10 transition-colors hover:bg-[#dfe5ff]'>more</button>
            )}
        </div>

    )
}

export default TopDoctors
