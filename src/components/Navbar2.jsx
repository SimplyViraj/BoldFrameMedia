import React from 'react'
import MobileMenu from './MobileMenu'
const Navbar2 = () => {
  return (
   <header className="w-full flex justify-between items-start px-6 py-6  pb-20 md:pb-40">
  
        <div className='fixed top-2 left-2 z-0'>
          <img src="/assets/BFM Icon Black.svg" alt="BFM Logo" className=" w-16 md:w-24 h-auto" />
        </div>

        <div className='invisible'>

        </div>

        <nav className="flex flex-col inter-tight-bold invisible md:visible  items-start text-[2.03rem] tracking-tighter leading-none">
          <a href="#" className="hover:text-gray-700">Home</a>
          <a href="#" className="hover:text-gray-700">About</a>
          <a href="#" className="hover:text-gray-700">Work</a>
          <a href="#" className="hover:text-gray-700">Contact</a>
        </nav>

        <div className="mt-1 invisible ">
          <button className="group relative w-6 h-[14px] flex flex-col justify-between">
            <span className="block h-[2px] bg-black w-full transition-all duration-300 group-hover:scale-x-75"></span>
            <span className="block h-[2px] bg-black w-full transition-all duration-300 group-hover:scale-x-50"></span>
          </button>
        </div>

        <MobileMenu />

      </header>
  )
}

export default Navbar2