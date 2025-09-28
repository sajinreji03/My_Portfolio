import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col justify-center items-center gap-4'>
      <div>
        <Image src={assets.sajin} alt='' className=' rounded-full w-32' />
      </div>
      <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo '>
            Hii! I'm Sajin Reji <Image src={assets.hand_icon} alt='' className='w-6' /> </h3>

            <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'> 
                Full Stack Web Developer
            </h1>
            <div className='flex flex-col sm:flex-row items-center gap-6 mt-6'>
                <a href='#contact' className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'>
                    Contact me <Image src={assets.right_arrow_white} alt='' className=' w-4' /></a>

                 <a href='/SajinReji.pdf' download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black '>
                 My Resume <Image src={assets.download_icon} alt='' className=' w-4' /></a>
            </div>
    </div>
  )
}

export default Header
