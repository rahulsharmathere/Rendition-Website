import React, { useEffect, useRef, useState } from 'react'
import { emotions } from '../constants'
import './CSS/Teaching.css'
import { motion } from 'framer-motion'
import {styles} from '../styles'
import { rotateContainer, textVariant } from '../utils/motion'

const Techings = () => {
  const extendedEmotions = [...emotions, ...emotions]
  const changeTime = 5380;

  const [activeIndices, setActiveIndices] = useState([1,2,17,18]);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(changeTime); // Initial interval time in ms
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [rotationDuration, setRotationDuration] = useState(100);

  const startInterval = (time) => {
    intervalRef.current = setTimeout(() => {
      setActiveIndices((prevIndices) => {
        return prevIndices.map((index) =>
          index === 1 ? extendedEmotions.length : index - 1
        );
      });
      startTimeRef.current = Date.now(); // Reset start time
      setRemainingTime(changeTime); // Reset remaining time
      startInterval(changeTime); // Restart the interval
    }, time);
  };

  useEffect(() => {
    if (!isPaused) {
      startTimeRef.current = Date.now(); // Store the current start time
      startInterval(remainingTime);
    }
    return () => clearTimeout(intervalRef.current);
  }, [isPaused, remainingTime]);

  const pauseInterval = () => {
    clearTimeout(intervalRef.current); // Clear current timeout
    const elapsedTime = Date.now() - startTimeRef.current; // Calculate elapsed time
    setRemainingTime((prev) => prev - elapsedTime); // Adjust remaining time
    setIsPaused(true);
  };

  const resumeInterval = () => {
    setIsPaused(false); // Resume the interval
  }
   
  const handleMouseDown = (e) => {
    setIsDragging(true);
    // setInitialX(e.clientX);
  };

  // const handleMouseMove = (e) => {
  //   if (isDragging) {
  //     setCurrentX(e.clientX);
  //     const dragSpeed = Math.abs(e.clientX - initialX) / 10;
  //     const newDuration = Math.max(10, 100 - dragSpeed); // Decrease duration as drag speed increases
  //     setRotationDuration(newDuration);
  //   }
  // };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className='relative z-10 w-full'>
        <div className="heading text-white bg-black p-10 font-bold text-4xl sm:text-7xl leading-[1.3em] ">
          <motion.div className={`title font-bold text-4xl sm:text-7xl leading-[1.3em] `} variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
            Teachings
          </motion.div>
        </div>
      <div className='w-full h-screen text-center relative bg-black overflow-hidden'>
        <div 
          className={`teachingCircle absolute w-[220px] h-[120px] top-1/4 -mt-[40px] left-1/2 -ml-[100px] origin-center preserve-3d rotateY-circle animate-custom ${isDragging ? 'dragging': ''}` }
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => {e.currentTarget.style.animationPlayState = 'running'; setIsDragging(false)}}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{'--quantity': extendedEmotions.length, '--rotation-duration': `${rotationDuration}s` }}
        >
          {extendedEmotions.map((item, index) => {
            return (
              <div 
                key={index} 
                className={`emotionItem absolute inset-0 translate-z-550 rotateY-custom hover:opacity-100 opacity-0 hover:cursor-pointer ${activeIndices.includes(index + 1) ? "active" : ""} `} 
                style={{'--position': index }}
                onMouseEnter={()=>{pauseInterval()}}
                onMouseLeave={()=>{resumeInterval()}}
              > 
                <div className='absolute text-white z-50 text-3xl flex justify-center align-center'>
                  <h1 className=''>{item.name}</h1>
                </div>
                <img className='w-full h-full object-cover ' src={item.icon} alt="" /> 
                <img className='reflection' src={item.icon} alt="" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Techings