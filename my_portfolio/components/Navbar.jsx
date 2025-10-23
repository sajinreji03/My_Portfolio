import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "../components/movingborder";

const Navbar = ({isDarkMode, setIsDarkMode}) => {

  const [isScroll, setIsScroll] =  useState(false)


    const sideMenuRef = useRef();
    const openMenu = () => {
      sideMenuRef.current.style.transform = 'translateX(-16rem)' 
    }
    const closeMenu = () => {
      sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(() => {
      window.addEventListener('scroll', () => {
       if(scrollY > 50){
           setIsScroll(true)  
       }else{
        setIsScroll(false)
       }
    })
  }, [])


  return (
    <>
    <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
      <Image src={assets.header_bg_color} alt='' className='w-full' />
    </div>
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white/90 backdrop-blur-lg shadow-sm dark:bg-gray-950 dark:shadow-white/20" : ""}`}>
        
            <div className="text-3xl font-semibold cursor-pointer mr-14">
              <span className="bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent font-extrabold">
                SAJIN
              </span>
              <span className="text-red-600 text-4xl">.</span>
            </div>

        
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white/60 shadow-sm dark:border dark:border-white/50 dark:bg-transparent"}  `}>
            <li><a className='font-Ovo' href='#top'>Home</a></li>
            <li><a className='font-Ovo' href='#about'>About me</a></li>
            <li><a className='font-Ovo' href='#projects'>My Projects</a></li>
            <li><a className='font-Ovo' href='#contact'>Contact me</a></li>
        </ul>
        <div className='flex items-center gap-6'>

          

           <Button >
             <a href='#contact' className='hidden lg:flex items-center gap-3  rounded-full font-Ovo 
            '>Contact 
            <Image src={ assets.arrow_icon_dark } alt='arrow icon' className='w-3'/></a>
           </Button>
           

            <button className='block md:hidden ml-3' onClick={openMenu}>
             <Image src={assets.menu_white} alt='menu icon' className='w-6 ' />
          </button>
        </div>

        {/*.......... mobile view.........*/}
        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-violet-950 dark:text-white '>
               
            <div className='absolute right-6 top-6' onClick={closeMenu}>
              <Image src={ assets.close_white } alt='' className='w-6 cursor-pointer'/>
            </div>
 
           <li><a className='font-Ovo' onClick={closeMenu} href='#top'>Home</a></li>
            <li><a className='font-Ovo' onClick={closeMenu} href='#about'>About me</a></li>
            <li><a className='font-Ovo' onClick={closeMenu} href='#projects'>My Projects</a></li>
            <li><a className='font-Ovo' onClick={closeMenu} href='#contact'>Contact me</a></li>
        </ul>

      </nav>
    </>
  )
}

export default Navbar
