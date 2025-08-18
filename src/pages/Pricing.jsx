import Navbar2 from '@/components/Navbar2'
import React from 'react'
import Content from '@/components/Content'

const Pricing = () => {
  return (
    <div>
        <Navbar2 />
         <section className="relative h-auto flex flex-col text-left overflow-hidden">
               <div className='text-[clamp(9rem,4vw,9rem)] inter-tight-900 font-bold leading-tighter tracking-tighter px-4'>
                Pricing
               </div>
               <Content />
                <div className="absolute right-10 bottom-6 text-gray-400 text-sm animate-bounce z-10">
                  ↓ Scroll to Explore
                </div>
              </section>
    </div>
  )
}

export default Pricing