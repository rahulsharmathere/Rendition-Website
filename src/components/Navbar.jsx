import React, { useEffect, useState } from 'react'
import logo from '../assets/Logo.png'
import { slideIn } from '../utils/motion';
import { motion } from 'framer-motion';

const pages= ["Home", "Teaching", "Events", "Team", "Fun"];

const Navbar = () => {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = (props) => {
    setSelected(props);
    setChecked(false);
  }

  useEffect(()=> {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div className={`fixed inset-0 flex justify-around items-center z-10 max-h-[150px] ${isScrolled ? "max-h-[70px] backdrop-blur-sm z-30" : ""} transition-all duration-500`}>
        <div className='sm:hidden flex'>

          {/* Navbar Items for Mobile Users */}
          <div className='flex flex-col z-20'>
            <input type="checkbox"
              id="checkbox"
              className="hidden"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="checkbox" className={`relative w-10 h-10 cursor-pointer flex flex-col items-center justify-center gap-[10px] transition-all duration-300`}>
              {/* Bars for the checkbox */}
              <div className={`w-full h-[3px] bg-[#a8a8a8] rounded-[5px] transition-all duration-300 ${checked ? 'ml-[13px] transform rotate-45 origin-left' : ''}`}/>
              <div className={`w-full h-[3px] bg-[#a8a8a8] rounded-[5px] transition-all duration-300 ${checked ? 'transform rotate-45 origin-center ml-0' : ''}`}/>
              <div className={`w-full h-[3px] bg-[#a8a8a8] rounded-[5px] transition-all duration-300 ${checked ? 'ml-[13px] transform -rotate-45 origin-left' : ''}`}/>
            </label>
          </div>
          {checked ? 
            <div className='fixed sm:hidden inset-0 bg-black bg-opacity-90 transition-opacity duration-300 ease-in-out'>
              <div className={`relative mt-[120px] px-3.5 gap-[20px] flex flex-col transform transition-transform duration-500 ease-in-out`}>
                {pages.map((title, index) => (
                  <div onClick={()=>{handleClick(title)}} className={`bg-gradient-to-r hover:from-transparent hover:to-red-800 ${selected === title ? 'from-transparent to-red-800' : ''}`}>
                    <motion.p 
                      initial="hidden" 
                      animate="show" 
                      variants={slideIn("left","spring", index*0.15 , 0.2)} 
                      className="text-3xl cursor-pointer text-white sm:bg-gradient-to-t sm:from-red-300 sm:to-red-800 leading-relaxed
                      bg-clip-text text-transparent hover:bg-clip-text sm:hover:text-transparent transition-all duration-500"
                    >
                      {title}
                    </motion.p>
                  </div>
                ))}
              </div>
            </div>
          : <></>}
        </div>

        {/* Rendition Logo */}
        <div className={`relative ml-[70px] sm:ml-0 h-[100px] lg:h-[150px] w-[100px] lg:h-[150px] -z-10 ${isScrolled? 'opacity-0': ''} transition-all duration-500`}>
          <img src={logo} alt="" className='relative inset-0 h-full w-full object-contain' />
        </div>
        
        {/* Display Navbar Items for Tablet and Laptop Userss */}
        <div className='gap-[10px] md:gap-[30px] ml-[-30px] hidden sm:flex flex-row text-white'>
          {pages.map((title, index) => (
            <p onClick={()=>{handleClick(title)}} className={`text-xl md:text-2xl lg:text-3xl cursor-pointer bg-gradient-to-t from-red-400 to-[#8B0000] 
            bg-clip-text ${selected === title ? 'text-transparent' : ""} hover:text-transparent hover:scale-105  transition-all duration-500`}>
              {title}
            </p>
          ))}
        </div>
        
        {/* Get-In-Touch Button */}
        <button className='bg-[#8B0000] text-white font-semibold lg:text-lg md:text-base text-sm py-2 px-6 rounded-full shadow-lg border-none hover:bg-red-700 transition-all duration-300 ease-in-out'>
          Get In Touch
        </button>
    </div>
  )
}

export default Navbar
