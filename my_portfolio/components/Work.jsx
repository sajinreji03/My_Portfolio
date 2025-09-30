import React from 'react'
import Image from 'next/image'
import { assets, workData } from '@/assets/assets'
import { motion } from "motion/react"

const Work = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    id='projects' className='w-full px-[12%] py-10 scroll-mt-20 lg:mt-6  '>
       <motion.h2
       initial={{y: -20, opacity: 0}}
       whileInView={{y: 0, opacity: 1}}
       transition={{duration: 0.3, delay: 0.5}}
       className='text-center text-5xl font-Ovo  '>My Projects</motion.h2>
       <motion.p
       initial={{opacity: 0}}
       whileInView={{opacity: 1}}
       transition={{duration: 0.5, delay: 0.5}}
       className='text-center max-w-3xl mx-auto mt-5 mb-12 font-Ovo'>
        Welcome to my web development portfolio! Here you will find a showcase of projects
         that highlight my skills in Front-end and Full-stack web development.</motion.p>

       <motion.div
       initial={{opacity: 0}}
       whileInView={{opacity: 1}}
       transition={{duration: 0.6, delay: 0.8}}
       className='grid grid-cols-1 sm:grid-cols-4 my-10 gap-5 dark:text-black'>
        {workData.map((project, index)=>(
            <motion.div
            whileHover={{scale: 1.05}}
            transition={{duration: 0.3}}
           key={index} 
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
            style={{backgroundImage: `url(${project.bgImage})`}}>
                <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 
                flex items-center justify-between duration-500 group-hover:bottom-7'>
                 <div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer">
                    <h2 className='font-semibold'>
                        {project.title}
                    </h2>
                    </a>

                    <p className='text-sm text-gray-900 '>
                        {project.description}
                    </p>
                 </div>
                    <div>
                    <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='border rounded-full border-black w-9 aspect-square flex items-center justify-center 
                    shadow-[2px_2px_0_#000] group-hover:bg-lime-400 transition'
                  >
                    <Image src={assets.send_icon} alt='send icon' className='w-5' />
                  </a>
                  </div>
                </div>
            </motion.div>
            ))}
       </motion.div>

        <motion.a
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        transition={{duration: 0.5, delay: 0.9}}
        href='' className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full 
        py-2 px-8 mx-auto my-12 lg:my-10 hover:bg-cyan-100 duration-500 dark:text-white dark:border-white dark:hover:bg-violet-950'>
           Show More <Image src={ assets.right_arrow_bold_dark } alt='rightarrow' className='w-4' />  </motion.a>

    </motion.div>
  )
}

export default Work
