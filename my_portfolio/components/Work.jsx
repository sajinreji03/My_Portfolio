import React from 'react'
import Image from 'next/image'
import { assets, workData } from '@/assets/assets'

const Work = () => {
  return (
    <div id='projects' className='w-full px-[12%] py-10 scroll-mt-20 lg:mt-6  '>
       <h2 className='text-center text-5xl font-Ovo  '>My Projects</h2>
       <p className='text-center max-w-3xl mx-auto mt-5 mb-12 font-Ovo'>
        Welcome to my web development portfolio! Here you will find a showcase of projects
         that highlight my skills in Front-end and Full-stack web development.</p>

       <div className='grid grid-cols-1 sm:grid-cols-4 my-10 gap-5'>
        {workData.map((project, index)=>(
            <div key={index} 
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
            style={{backgroundImage: `url(${project.bgImage})`}}>
                <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 
                flex items-center justify-between duration-500 group-hover:bottom-7'>
                 <div>
                    <h2 className='font-semibold'>
                        {project.title}
                    </h2>
                    <p className='text-sm text-gray-800'>
                        {project.description}
                    </p>
                 </div>
                 <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center 
                 shadow-[2px_2px_0_#000] group-hover:bg-lime-400 transition '>
                    <Image src={assets.send_icon} alt='send icon' className='w-5' />
                 </div>
                </div>
            </div>
            ))}
       </div>

        <a href='' className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full 
        py-2 px-8 mx-auto my-12 lg:my-10 hover:bg-cyan-100 duration-500'>
           Show More <Image src={assets.right_arrow_bold} alt='rightarrow' className='w-4' />  </a>

    </div>
  )
}

export default Work
