import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20'>
      <div  className="text-3xl font-semibold cursor-pointer text-center">
              SAJIN REJI
              <span className="text-red-600 text-4xl">.</span>

              <div className='w-max flex items-center gap-2 mx-auto'>
                <Image src={assets.mail_icon} alt='mail icon' className='w-6' />
                <span className='text-lg font-medium font-serif'><a target='_blank' href='https://mail.google.com/mail/u/1/#inbox'>sajinreji03@gmail.com</a></span>
              </div>
             </div>
                 
                 <div className='text-center sm:flex items-center justify-between mt-12 border-t border-gray-500 mx-[10%] py-6'>
                    <p>© 2025 Sajin Reji . All Rights Reserved</p>
                   <ul className="flex items-center justify-center gap-10 mt-4 sm:mt-0">
                        <li className="flex items-center">
                          <Image src={assets.github} alt="github icon" className="w-10 h-10" />
                          <a target="_blank" href="https://github.com/sajinreji03">GitHub</a>
                        </li>

                        <li className="flex items-center">
                          <Image src={assets.github} alt="linkedin icon" className="w-10 h-10" />
                          <a target="_blank" href="https://linkedin.com/in/sajinreji">LinkedIn</a>
                        </li>

                        <li className="flex items-center">
                          <Image src={assets.github} alt="instagram icon" className="w-10 h-10" />
                          <a target="_blank" href="https://instagram.com/sajin_reji_23?igsh=MTRucmplZjJ5MnhpZA==">Instagram</a>
                        </li>
                      </ul>

                 </div>


    </div>
  )
}

export default Footer
