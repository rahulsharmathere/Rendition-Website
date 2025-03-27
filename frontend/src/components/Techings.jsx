import React, { useEffect, useRef, useState } from 'react'
import { emotions } from '../constants'
import './CSS/Teaching.css'
import { motion } from 'framer-motion'
import {styles} from '../styles'
import { gsap } from 'gsap/gsap-core'
import { TextPlugin } from 'gsap/all'
import { textVariant } from '../utils/motion'
import { withLoadTracking } from './withLoadTracking'

const Techings = withLoadTracking(({onLoad}) => {
  gsap.registerPlugin(TextPlugin);
  const animationRef = useRef(null);
  
  const extendedEmotions = [...emotions, ...emotions]
  const [hovered, setHovered] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [animationStartTime, setAnimationStartTime] = useState(performance.now());
  const [currentTime, setCurrentTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDuration = 100000;

  useEffect(()=>{
    setAnimationStartTime(performance.now());
  },[])

  useEffect(()=>{
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && selected ) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    if(selected) {
      gsap.to('.enlarged-description', {
        duration: 2,
        text: {
          value: extendedEmotions[selected].description
        },
        delay: 1,
      })
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  },[selected])

  const moveForward = () => {
    if(animationRef.current && !isAnimating) {
      // Set animating state to prevent multiple clicks
      setIsAnimating(true);
      
      // Get the current animation state
      const elapsed = performance.now() - animationStartTime;
      const currentPosition = (elapsed % animationDuration) / 1000;
      const targetPosition = currentPosition + 7; // Add 7 seconds
      
      // Pause the current animation
      animationToggle('paused');
      
      // Create a GSAP animation to smoothly transition to the target position
      gsap.to(animationRef.current, {
        duration: 1, // Duration of the smooth transition
        onUpdate: function() {
          // Calculate the interpolated position during the transition
          const progress = this.progress();
          const newPosition = currentPosition + (progress * 7);
          
          // Apply the new position
          animationRef.current.style.animation = 'none';
          void animationRef.current.offsetWidth; // Trigger reflow
          animationRef.current.style.animation = `autoRun ${animationDuration/1000}s linear infinite`;
          animationRef.current.style.animationDelay = `-${newPosition}s`;
        },
        onComplete: function() {
          // Update the animation start time for future calculations
          setAnimationStartTime(performance.now() - (targetPosition * 1000));
          animationToggle('running');
          // Release the animation lock
          setIsAnimating(false);
        }
      });
    }
  };
  
  // Updated moveBackward function with animation lock
  const moveBackward = () => {
    if(animationRef.current && !isAnimating) {
      // Set animating state to prevent multiple clicks
      setIsAnimating(true);
      
      // Get the current animation state
      const elapsed = performance.now() - animationStartTime;
      const currentPosition = (elapsed % animationDuration) / 1000;
      const targetPosition = Math.max(0, currentPosition - 7); // Subtract 7 seconds, but don't go below 0
      
      // Pause the current animation
      animationToggle('paused');
      
      // Create a GSAP animation to smoothly transition to the target position
      gsap.to(animationRef.current, {
        duration: 1, // Duration of the smooth transition
        onUpdate: function() {
          // Calculate the interpolated position during the transition
          const progress = this.progress();
          const newPosition = currentPosition - (progress * 7);
          
          // Apply the new position
          animationRef.current.style.animation = 'none';
          void animationRef.current.offsetWidth; // Trigger reflow
          animationRef.current.style.animation = `autoRun ${animationDuration/1000}s linear infinite`;
          animationRef.current.style.animationDelay = `-${newPosition}s`;
        },
        onComplete: function() {
          // Update the animation start time for future calculations
          setAnimationStartTime(performance.now() - (targetPosition * 1000));
          animationToggle('running');
          // Release the animation lock
          setIsAnimating(false);
        }
      });
    }
  };

  const handleClose = () => {
    let ele = document.getElementById('enlarged');
    if(ele) {
      ele.classList.add('closeAnimation')
      setTimeout(()=>{
        ele.classList.remove('closeAnimation')
        setSelected(null);
        animationToggle('running')
      },1000)
    }
  }

  const animationToggle = (state) => {
    let ele = document.getElementById('circle')
    if(ele) {
      ele.style.animationPlayState = state;
    }
  }

  return (
    <div id="Teachings" className='sticky top-0 w-full'>
      <div className="heading text-white bg-black p-10 font-bold text-4xl sm:text-7xl leading-[1.3em] ">
        <motion.div className={`title font-bold text-4xl sm:text-7xl leading-[1.3em] `} variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
          Teachings
        </motion.div>
      </div>
      {selected !== null ? 
        <div className='flex justify-center items-center h-full'>
          <div 
            id='enlarged'
            className='enlarged-view absolute top-[10%] bg-red-800 w-[90%] h-1/2 md:h-4/5 z-10 openAnimation overflow-hidden' 
            style={{ backgroundImage: `url(${extendedEmotions[selected].icon})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className='absolute inset-0 bg-black opacity-80'></div>
            <h6 className='absolute z-10 text-3xl text-slate-400 left-[85%] md:left-[95%] pr-4 pt-2 transition-all duration-500 hover:text-white hover:cursor-pointer' onClick={()=>{handleClose()}}>
              Esc
            </h6>
            <motion.div className='relative w-full flex flex-row justify-center pt-2' variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
              <h1 className='text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl'>{extendedEmotions[selected].name}</h1>
            </motion.div>
            <div className='relative h-full md:h-auto flex flex-col-reverse md:flex-row justify-around md:justify-center items-center p-10 gap-4'>
              <div className='enlarged-description w-full md:w-[40%] text-white text-lg md:text-xl lg:text-2xl'></div>
              <div className='relative w-full md:w-[60%] flex flex-row -top-[5%] '>
                <img src={Object.values(extendedEmotions[selected].images)[0]} alt="" className='absoute z-10 w-[55%] h-auto object-cover rounded-lg ' />
                <img src={Object.values(extendedEmotions[selected].images)[1]} alt="" className='absolute z-10 top-[65%] left-[20%] w-[70%] h-full object-cover rounded-lg'/>
                <img src={Object.values(extendedEmotions[selected].images)[2]} alt="" className='absolute z-10 left-[60%] w-2/5 h-[130%] object-cover rounded-lg' />
              </div>
            </div>
          </div>
        </div>
      : 
      <div className='flex justify-center items-center'>
        <>
          <button 
            className={`backward absolute left-0 top-0 h-full w-16 z-10 flex items-center justify-center transition-all duration-300 
                      ${isAnimating ? 'opacity-30 bg-transparent' : 'bg-transparent hover:bg-red-800/30'}`}
            onClick={moveBackward}
            disabled={isAnimating}
          >
            <div className="flex items-center justify-center h-16 w-16 opacity-60 hover:opacity-100 transition-all duration-300">
              <span className="text-3xl text-white">&larr;</span>
            </div>
          </button>
          
          <button 
            className={`forward absolute right-0 top-0 h-full w-16 z-10 flex items-center justify-center transition-all duration-300
                      ${isAnimating ? 'opacity-30 bg-transparent' : 'bg-transparent hover:bg-red-800/30'}`}
            onClick={moveForward}
            disabled={isAnimating}
          >
            <div className="flex items-center justify-center h-16 w-16 opacity-60 hover:opacity-100 transition-all duration-300">
              <span className="text-3xl text-white">&rarr;</span>
            </div>
          </button>
        </>
      </div>
      
      }
      <div className='w-full h-[80vh] text-center relative bg-black overflow-hidden'>
        <div 
          className={`teachingsCircle absolute w-[220px] h-[120px] top-1/4 -mt-[60px] left-1/2 -ml-[100px] origin-center preserve-3d rotateY-circle animate-custom`}
          id = 'circle'
          onMouseEnter={() => {selected === null ? animationToggle('paused') : ""}}
          onMouseLeave={() => {selected === null ? animationToggle('running') : ""}}
          style={{'--quantity': extendedEmotions.length, '--rotation-duration': `100s` }}
          ref={animationRef}
        >
          {extendedEmotions.map((item, index) => {
            return (
              <div 
                key={index} 
                className={`emotionItem absolute inset-0 rotateY-custom opacity-80 hover:opacity-100 hover:cursor-pointer `} 
                style={{'--position': index }}
                onMouseEnter={()=>{setHovered(index)}}
                onMouseLeave={()=>{setHovered(-1)}}
                onClick={()=>{setSelected(index); animationToggle('paused');}}
              > 
                <div className='absolute text-white z-30 text-4xl w-full h-full flex justify-center items-center'>
                  <h1 className={`transition-all duration-500 ${hovered === index ? 'opacity-100' : 'opacity-0'}`}>{item.name}</h1>
                </div>
                <img className={`w-full h-full object-cover `} src={item.icon} alt="" /> 
                <img className='reflection' src={item.icon} alt="" />
              </div>
            )
          })}
        </div>
      </div>  
    </div>
  )
})

export default Techings