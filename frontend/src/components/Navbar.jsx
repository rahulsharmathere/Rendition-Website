import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/Logo.png'
import { fadeIn } from '../utils/motion';
import { motion } from 'framer-motion';
import { withLoadTracking } from './withLoadTracking'

const pages= ["Home", "Teachings", "Events", "Team", "Productions"];

const Navbar = withLoadTracking(({onLoad}) => {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollRef = useRef(0);

  const handleClick = (props) => {
    setSelected(props);
    setChecked(false);
    const element = document.getElementById(props);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(()=> {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      const ele = document.getElementById('navbar')
      if(ele && !checked) {
        const currentScrollTop = window.scrollY;
        if(currentScrollTop > prevScrollRef.current) {
            if(!ele.classList.contains('-translate-y-20'))
                ele.classList.add('-translate-y-20')
        }
        else {
            if(ele.classList.contains('-translate-y-20'))
                ele.classList.remove('-translate-y-20')
        }
        prevScrollRef.current = currentScrollTop;
      }

      pages.forEach((page) => {
        const section = document.getElementById(page);
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        if (rect.top >= 0 && rect.top <= windowHeight * 0.2) {
          setSelected(page);
        }
      });
    };
    handleScroll();
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checked])

  return (
    <div id="navbar" className={`fixed inset-0 flex justify-around items-center z-10 max-h-[150px] ${isScrolled ? "max-h-[60px] backdrop-blur-sm z-40" : ""} transition-all duration-500`}>
      <div className='sm:hidden flex'>
        {/* Navbar Items for Mobile Users */}
        <div className='flex flex-col z-20'>
          <input type="checkbox"
            id="checkbox"
            className="hidden"
            checked={checked}
            onClick={() => setChecked(!checked)}
          />
          <label htmlFor="checkbox" className={`relative w-10 h-10 cursor-pointer flex flex-col items-center justify-center gap-[10px] transition-all duration-300`}>
            {/* Bars for the checkbox */}
            <div className={`w-full h-[3px] bg-[#a8a8a8] rounded-[5px] transition-all duration-300 ${checked ? 'ml-[13px] transform rotate-45 origin-left' : ''}`}/>
            <div className={`w-full h-[3px] bg-[#a8a8a8] rounded-[5px] transition-all duration-300 ${checked ? 'transform rotate-45 origin-center ml-0' : ''}`}/>
            <div className={`w-full h-[3px] bg-[#a8a8a8] rounded-[5px] transition-all duration-300 ${checked ? 'ml-[13px] transform -rotate-45 origin-left' : ''}`}/>
          </label>
        </div>
      </div>
      {checked ? 
        <div className='fixed w-screen h-screen '>
          <div className='fixed w-screen px-6 overflow-hidden h-screen sm:hidden inset-0 bg-black bg-opacity-90 z-50 transition-opacity duration-300 ease-in-out'>
          <div className={`relative ${isScrolled ? "mt-[90px]" : "mt-[120px]"} gap-[20px] flex flex-col justify-center items-center transform transition-transform duration-500 ease-in-out`}>
            {pages.map((title, index) => (
              <div onClick={()=>{handleClick(title)}} className={`text-center`}>
                <motion.p 
                  initial="hidden" 
                  animate="show" 
                  variants={fadeIn("right","spring", index*0.15 , 0.2)} 
                  className={`
                    text-4xl font-bold cursor-pointer 
                    transition-all duration-300 
                    ${selected === title 
                      ? 'text-red-600 scale-105' 
                      : 'text-white hover:text-red-400'
                    }
                  `}
                >
                  {title}
                </motion.p>
              </div>
            ))}
            <motion.button
                initial="hidden" 
                animate="show" 
                variants={fadeIn("right","spring", 6*0.15 , 0.2)} 
                className='bg-red-800 text-white font-semibold text-xl py-3 px-8 rounded-full shadow-lg w-max
                hover:bg-red-700 transition-all duration-300 mt-8'
                onClick={() => handleClick('Form')}
              >
                Get In Touch
              </motion.button>
          </div>
          </div>
        </div>
        : <></>}

        {/* Rendition Logo */}
        <div className={`relative ml-[70px] sm:ml-0 h-[100px] lg:h-[150px] w-[100px] lg:h-[150px] -z-10 ${isScrolled? 'opacity-0': ''} transition-all duration-500`}>
          <img src={logo} alt="" className='relative inset-0 h-full w-full object-contain' />
        </div>
        
        {/* Display Navbar Items for Tablet and Laptop Userss */}
        <div className='gap-[10px] md:gap-[30px] hidden sm:flex flex-row text-white'>
          {pages.map((title, index) => (
            <p 
              onClick={()=>{handleClick(title)}} 
              className={`text-xl md:text-2xl lg:text-3xl cursor-pointer bg-gradient-to-t from-red-400 to-[#8B0000] bg-clip-text 
                ${selected === title ? 'text-transparent' : ""} 
                hover:text-transparent hover:scale-105  transition-all duration-500`}
            >
              {title}
            </p>
          ))}
        </div>
        
        {/* Get-In-Touch Button */}
        <button 
          className='bg-[#8B0000] text-white font-semibold lg:text-lg md:text-base text-sm py-2 px-6 rounded-full shadow-lg border-none hover:bg-red-700 transition-all duration-300 ease-in-out'
          onClick={()=>{handleClick('Form')}}
        >
          Get In Touch
        </button>
    </div>
  )
})

export default Navbar
