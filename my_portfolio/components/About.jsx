import React from 'react'
import Image from 'next/image'
import { assets, infoList, toolsData } from '@/assets/assets'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20 '>
      <h2 className='text-center text-5xl font-Ovo '>About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        
        <div className='w-64 sm:w-80 rounded-3xl max-w-none -mt-12 '>
            <Image src={assets.user_sajin} alt='user' className='w-full rounded-3xl'/>
        </div>
        <div className='flex-1 -mt-14'>
             <p className='mb-12 font-Ovo max-w-2xl'>
                I am a passionate and detail-oriented MCA student with hands-on experience in full-stack web development,
                 specializing in the MERN stack, Next.js, and modern UI frameworks. I enjoy building dynamic, 
                 user-friendly applications and have developed projects ranging from AI-powered chatbots to 
                 business portals and responsive web apps. With strong problem-solving skills, 
                 a solid foundation in programming, and internship experience as a Next.js Developer, 
                 I am eager to apply my knowledge to create impactful digital solutions while 
                 continuously learning and growing in the tech industry.</p>

                 <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl -mt-5'>
                    {infoList.map(({icon, iconDark, title, description}, index)=>(
                        <li className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 
                         duration-300 hover:shadow-black ' key={index} >
                            <Image src={icon} alt={title} className='w-7 mt-3'/>
                            <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                            <p className='text-gray-600 text-sm'>{description}</p>
                        </li>
                    ))}
                 </ul>

                 <h4>Tools I use</h4>
                 <ul>
                  { toolsData.map((tool, index)=>(
                    <li key={index}>
                      <Image src={tool} alt='tool' className='w-5 sm:w-7'/>
                    </li>
                  ))}
                 </ul>
        </div>
      </div>
    </div>
  )
}

export default About
