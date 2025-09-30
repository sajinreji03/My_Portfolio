import React from 'react'
import Image from 'next/image'
import { assets, infoList, toolsData } from '@/assets/assets'
import { motion } from "motion/react"

const About = () => {
  return (
    <motion.div id='about' className='w-full px-[12%] py-10 scroll-mt-20 ' 
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    
    >
      <motion.h2 
      initial={{y: -20, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.5, delay: 0.3}}
      className='text-center text-5xl font-Ovo '>About Me</motion.h2>

      <motion.div
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      transition={{duration: 0.8}}
      className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        
        <motion.div  
          initial={{ opacity: 0, scale: 0.9}}
          whileInView={{ opacity: 1, scale: 1}}
          transition={{duration: 0.6}}
        className='w-64 sm:w-80  rounded-3xl max-w-none -mt-14 lg:-mt-80   '>
            <Image src={assets.user_sajin} alt='user' className='w-full rounded-3xl'/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1}}
          transition={{duration: 0.6, delay: 0.5}}

        className='flex-1 -mt-14'>
             <p className='mb-12 font-Ovo max-w-2xl'>
                I am a passionate and detail-oriented MCA student with hands-on experience in full-stack web development,
                 specializing in the MERN stack, Next.js, and modern UI frameworks. I enjoy building dynamic, 
                 user-friendly applications and have developed projects ranging from AI-powered chatbots to 
                 business portals and responsive web apps. With strong problem-solving skills, 
                 a solid foundation in programming, and internship experience as a Next.js Developer, 
                 I am eager to apply my knowledge to create impactful digital solutions while 
                 continuously learning and growing in the tech industry.</p>

                 <motion.ul
                  initial={{ opacity: 0}}
                  whileInView={{ opacity: 1}}
                  transition={{duration: 0.8, delay: 0.8}}
                 className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl -mt-5'>
                    {infoList.map(({icon, iconDark, title, description}, index)=>(
                        <motion.li
                        whileHover={{scale: 1.05}}
                        className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-fuchsia-50 hover:-translate-y-1 
                         duration-300 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-violet-950/50 ' key={index} >
                            <Image src={iconDark} alt={title} className='w-7 mt-3'/>
                            <h3 className='my-4 font-semibold text-gray-800 dark:text-white'>{title}</h3>
                            <p className='text-gray-700 text-sm dark:text-white/80'>{description}</p>
                        </motion.li>
                    ))}
                 </motion.ul>

                 <motion.h4
                  initial={{y: 20, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  transition={{duration: 1.3, delay: 0.5}}
                 className='my-6 text-gray-900 font-serif dark:text-white/80'>Tools/Languages I use</motion.h4>
                 <motion.ul
                  initial={{ opacity: 0}}
                  whileInView={{ opacity: 1}}
                  transition={{duration: 1.5, delay: 0.6}}
                 className='flex flex-wrap justify-center gap-3 sm:gap-5'>
                  { toolsData.map((tool, index)=>(
                    <motion.li
                    whileHover={{scale: 1.2}}
                     className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 
                         duration-300 ' 
                    key={index}>
                      <Image src={tool} alt='tool' className='w-5 sm:w-7'/>
                    </motion.li>
                  ))}
                 </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default About
