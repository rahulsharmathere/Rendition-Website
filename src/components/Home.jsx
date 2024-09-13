import React, { useEffect } from 'react'
import background from '../assets/background.jpg'
import { styles } from '../styles'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'

const heading = "RENDITION";

const Home = () => {

  useEffect(()=>{
    const handleScroll = () => {
      let text = document.getElementById('mainHeading');
      let val = window.scrollY;
      if(text)
        text.style.marginTop = val*1.2 + 'px';
    }

    window.addEventListener('scroll',handleScroll)

    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  },[])

  return (
    <div className={`relative h-screen w-screen flex items-center justify-center`}>
      <img src={background} className='absolute inset-0 h-full w-full object-cover' alt="" />
      <div className='relative flex items-center justify-center flex-col z-0' id='mainHeading'>
        <motion.div initial="hidden" animate="show" variants={textVariant()} className='flex flex-row justify-center items-center'>
          {heading.split("").map((letter, index) => (
            <div key={index} className="relative flex flex-row">
              <h1 className={styles.headingShadow}>{letter}</h1>
              <h1 className={styles.headingFont}>{letter}</h1>
            </div>
          ))}
        </motion.div>
        <motion.div initial="hidden" animate="show" variants={textVariant()}>
        <div className='flex flex-row items-center gap-[2px] sm:gap-[5px]'>
          <p className='text-zinc-600 font-thick text-base sm:text-lg '>_________</p>
          <h1 className='text-3xl sm:text-5xl pt-[10px] font-normal text-orange-800'>THE THEATRE CLUB</h1>
          <p className='text-zinc-600 font-thick text-base sm:text-lg '>_________</p>
        </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
