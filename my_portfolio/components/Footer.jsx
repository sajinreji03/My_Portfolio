import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import Shuffle from '@/components/shuffle'



const Footer = () => {

const phone = "918590825352"; // put your phone with country code, no plus
const waLink = `https://wa.me/${phone}?text=${encodeURIComponent("Hi, I found you on the website!")}`;

  return (
    <div className='mt-20'>
      <div  className="text-3xl font-semibold cursor-pointer text-center">
              
            <Shuffle
              text="SAJIN REJI"
              shuffleDirection="right"
              duration={1}          
              animationMode="random"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.06}        
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={false} 
              respectReducedMotion={true}
              loop={true}          
              loopDelay={0}
            />

              <div className='w-max flex items-center gap-2 mx-auto'>
                <Image src={ assets.mail_icon} alt='mail icon' className='w-6' />
                <span className='text-lg font-medium font-serif'><a target='_blank' href='https://mail.google.com/mail/u/1/#inbox'>sajinreji03@gmail.com</a></span>
              </div>
             </div>
                 
                 <div className='text-center sm:flex items-center justify-between mt-12 border-t border-gray-500 mx-[10%] py-6'>
                    <p>© 2025 Sajin Reji . All Rights Reserved</p>
                   <ul className="flex items-center justify-center gap-10 mt-4 sm:mt-0">
                        <li className="flex items-center">
                          <Image src={assets.github1} alt="github icon" className="w-5 h-5 mr-1" />
                          <a target="_blank" href="https://github.com/sajinreji03">GitHub</a>
                        </li>

                        <li className="flex items-center">
                          <Image src={assets.linkedin} alt="linkedin icon" className="w-5 h-5 mr-1" />
                          <a target="_blank" href="https://linkedin.com/in/sajinreji">LinkedIn</a>
                        </li>

                       <li className="flex items-center">
                          <Image
                            src={assets.watsapp}      // or "/whatsapp.svg" if it's in public/
                            alt="WhatsApp icon"
                            className="w-8 h-8"
                          />
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                          >
                            WhatsApp
                          </a>
                        </li>

                      </ul>

                 </div>


    </div>
  )
}

export default Footer
