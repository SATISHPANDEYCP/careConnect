
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='mx-auto w-full max-w-[1300px]'>

      <div className='pt-12 text-center text-2xl text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-12 mb-28 grid items-center gap-10 text-sm md:grid-cols-[minmax(300px,480px)_minmax(0,1fr)] lg:gap-16'>
        <img className='h-full max-h-[540px] w-full rounded-lg object-cover' src={assets.contact_image} alt="CareConnect doctor consulting a family" />
        <div className='flex max-w-xl flex-col items-start justify-center gap-6 leading-relaxed sm:text-base'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className=' text-gray-500'>273010 <br /> Madan Mohan Malaviya University of Technology , Gorakhpur</p>
          <p className=' text-gray-500'>+91 9451408951 <br /> Email: careconnectowner@gmail.com</p>
          <p className=' font-semibold text-lg text-gray-600'>CAREERS AT CARECONNECT</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='rounded-lg border border-black px-8 py-4 text-sm transition-all duration-300 hover:bg-black hover:text-white'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
