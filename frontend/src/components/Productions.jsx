import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'
import { acts } from '../constants'
import ToolkitButton from './ToolkitButton'
import './CSS/Productions.css'
import { withLoadTracking } from './withLoadTracking'

const Productions = withLoadTracking(({onLoad}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startingPositions, setStartingPositions] = useState({"StagePlay": -1, "MonoAct":-1, "Mime":-1})
  const [isTransitioning, setIsTransitioning] = useState(false);
  const maxVisibleDots = 5;
  let performance = ['MonoAct', 'StagePlay', 'Mime']

  useEffect(() => {
    const updatedPositions = { ...startingPositions };

    acts.forEach((act, index) => {
      if (updatedPositions[act.category] === -1) {
        updatedPositions[act.category] = index;
      }
    });
    setStartingPositions(updatedPositions);
  }, [])

  const handlePrevClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index => {
      if(index === 0) return acts.length-1;
      return index-1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index => {
      if(index === acts.length-1) return 0;
      return index+1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }

  // Calculate pagination dots display logic
  const getVisibleDotIndices = () => {
    const totalDots = acts.length;
    if (totalDots <= maxVisibleDots) return Array.from({length: totalDots}, (_, i) => i);
    
    let startDot = currentIndex - Math.floor(maxVisibleDots / 2);
    
    // Adjust when near the beginning
    if (startDot < 0) startDot = 0;
    
    // Adjust when near the end
    if (startDot + maxVisibleDots > totalDots) {
      startDot = totalDots - maxVisibleDots;
    }
    
    return Array.from({length: maxVisibleDots}, (_, i) => startDot + i);
  };

  const visibleDotIndices = getVisibleDotIndices();
  const currentCategory = acts[currentIndex]?.category || "";

  return (
    <div id="Productions" className='relative bg-gradient-to-b from-black to-gray-900 w-full h-auto overflow-hidden flex flex-col'>
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,69,0,0.1),transparent_70%)]"></div>
      
      <motion.div 
        className='flex flex-col sm:flex-row justify-between heading text-white p-6 md:p-8'
        variants={textVariant(0)} 
        initial="hidden" 
        whileInView="show" 
        viewport={{once: true, amount: 0.25}}
      > 
        <h1 className="font-bold text-4xl sm:text-6xl md:text-7xl leading-[1.3em] text-white">
          Productions
        </h1>
      </motion.div>

      <div className='relative flex-grow w-full flex flex-col md:flex-row gap-5 px-4 md:px-8 pb-16'>
        {/* Category Selection Sidebar */}
        <div className='w-[95%] md:w-1/4 gap-4 text-center flex flex-row md:flex-col'>
          {performance.map((heading) => (
            <motion.button
              key={heading}
              whileHover={{ scale: startingPositions[heading] !== -1 ? 1.05 : 1 }}
              whileTap={{ scale: startingPositions[heading] !== -1 ? 0.95 : 1 }}
              className={`relative text-lg sm:text-xl md:text-2xl lg:text-3xl text-white rounded-lg w-full h-max py-3 md:py-4 flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden
                ${acts[currentIndex].category === heading 
                  ? 'bg-gradient-to-r from-red-800 to-red-600 shadow-lg shadow-red-900/30' 
                  : "bg-gray-800/70 hover:bg-gray-700/80"}
                ${startingPositions[heading] === -1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={()=>{
                if(startingPositions[heading] !== -1 && !isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(startingPositions[heading]);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              disabled={startingPositions[heading] === -1 || isTransitioning}
            >
              {heading}
              {acts[currentIndex].category === heading && (
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-orange-300"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="relative flex-grow h-full md:w-3/4 overflow-hidden rounded-lg bg-black/50 shadow-xl flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none z-10"></div>
          
          {/* Production Title Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 w-full py-3 px-4 bg-gradient-to-r from-black/80 via-gray-900/70 to-black/80 backdrop-blur-sm"
          >
            <h1 className="text-white font-bold text-xl md:text-3xl text-center leading-normal">
              {acts[currentIndex].title}
            </h1>
            <div className="mt-1 text-center">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-red-900/50 text-orange-200">
                {currentCategory}
              </span>
            </div>
          </motion.div>

          {/* Video Carousel */}
          <div className="relative flex flex-grow overflow-hidden">
            {acts.map((act, i) => (
              <motion.div 
                key={i} 
                className="relative flex flex-col items-center justify-center w-full h-full shrink-0 grow-0"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: i === currentIndex ? 1 : 0,
                  x: `${-100 * currentIndex}%`
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex w-11/12 md:w-4/5 h-auto aspect-video rounded-lg overflow-hidden shadow-2xl shadow-orange-900/20" aria-hidden={currentIndex !== i}>
                  <iframe
                    className="w-full h-full"
                    src={act.src}
                    title={act.title}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.div 
            className='absolute text-white text-3xl sm:text-4xl left-0 top-1/2 translate-x-1 sm:translate-x-4 z-20'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevClick}
          >
            <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-red-900/70 transition-colors">
              <ToolkitButton name="Left"/>
            </div>
          </motion.div>
          
          <motion.div 
            className='absolute text-white text-3xl sm:text-4xl right-0 top-1/2 -translate-x-1 sm:-translate-x-4 z-20'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextClick}
          >
            <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-red-900/70 transition-colors">
              <ToolkitButton name="Right"/>
            </div>
          </motion.div>

          {/* Sliding Pagination Dots */}
          <div className='absolute flex items-center gap-1 bottom-4 left-0 justify-center w-full h-auto z-20'>
            <div className='flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-black/40 backdrop-blur-sm'>
              {/* Show left arrow when scrolled from beginning */}
              {visibleDotIndices[0] > 0 && (
                <button 
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                  onClick={() => setCurrentIndex(Math.max(0, visibleDotIndices[0] - 1))}
                >
                  &lsaquo;
                </button>
              )}
              
              {/* Map only visible dots */}
              {visibleDotIndices.map(index => (
                <motion.button
                  key={index}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                    currentIndex === index 
                      ? "scale-100 bg-gradient-to-r from-red-500 to-orange-400 shadow-lg shadow-orange-500/50" 
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  disabled={isTransitioning}
                />
              ))}
              
              {/* Show right arrow when more dots available */}
              {visibleDotIndices[visibleDotIndices.length - 1] < acts.length - 1 && (
                <button 
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                  onClick={() => setCurrentIndex(Math.min(acts.length - 1, visibleDotIndices[visibleDotIndices.length - 1] + 1))}
                >
                  &rsaquo;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Productions