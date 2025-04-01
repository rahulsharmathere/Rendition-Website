import React, { useEffect, useState } from 'react'
import { background_images } from '../constants'
import './CSS/Team.css'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'
import { team } from '../constants'
import { withLoadTracking } from './withLoadTracking'

const Team = withLoadTracking(({onLoad}) => {
  
  const [selectedBatch, setSelectedBatch] = useState("Y-23")
  const [imageLoader, setImageLoader] = useState(true);
  const [imageChunks, setImageChunks] = useState([]);

  useEffect(()=> {
    const rowHeight = 150; // Example row height in pixels
    let numberOfRows = Math.ceil(window.innerHeight / rowHeight);
    if(window.innerWidth < 768) {
      numberOfRows = 5;
    }
    console.log(numberOfRows)
    const imagesPerRow = Math.floor(background_images.length / numberOfRows);
    const chunks = splitArrayIntoChunks(background_images, imagesPerRow, numberOfRows);
    
    setImageChunks(chunks);
  },[])

  const splitArrayIntoChunks = (arr, chunkSize, rowSize) => {
    const result = [];
    let index = 0;
    for (let i = 0; i < rowSize; i++) {
      result.push(arr.slice(index, index + chunkSize));
      index = index+chunkSize;
    }
    return result;
  };



  return (
    <div id="Team" className='relative w-screen h-max min-h-screen bg-black overflow-hidden'>
      <div className='absolute flex flex-col gap-[10px] pt-[10px] pointer-events-none'>
        {imageChunks.map((imageChunk, rowIndex) => (
          <div className={`relative flex gap-[10px] w-max image-row ${rowIndex % 2 === 0 ? 'even' : 'odd'}`} key={rowIndex}>
            {imageChunk.map((src, index) => (
              <img
                // loading='lazy' 
                src={src} 
                alt={`Image ${index}`} 
                key={index} 
                className='relative w-[150px] h-[150px] object-cover '
              />
            ))}
            {imageChunk.map((src, index) => (
              <img
                // loading='lazy' 
                src={src} 
                alt={`Image ${index}`} 
                key={index} 
                className='relative w-[150px] h-[150px] object-cover'
              />
            ))}
          </div>
        ))}
      </div>  
      <div className='absolute inset-0 bg-black opacity-70'></div>
      <div className='relative '>
        <motion.div className='flex flex-col md:flex-row justify-between round heading text-white p-10 font-bold text-4xl md:text-7xl leading-[1.3em]' variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}> 
          <div className={`title font-bold text-5xl md:text-7xl leading-[1.3em] `}>
            Team
          </div>
          <div className='relative flex justify-around items-center flex-wrap gap-2 w-full'>
            {team.map((item, index) => (
              <div 
                className={`relative text-white text-2xl md:text-4xl rounded-lg hover:bg-orange-700 p-[10px] hover:cursor-pointer transition-all duration-500 ${selectedBatch === item.batch ? "bg-orange-700 scale-110": "bg-slate-700"}`}
                onClick={()=>{setSelectedBatch(item.batch); setImageLoader(true)}}
              >
                {item.batch}
              </div>
            ))}
          </div>
        </motion.div>
        {team.map((item, index) => (
          item.batch === selectedBatch && (
          <div className='relative flex flex-col md:flex-row w-full px-[5%] -mt-5 gap-5'>
            {item.coordinators !== null ? 
            <div className='relative w-full md:w-[40%] gap-10' > 
              <div className='text-4xl lg:text-5xl text-transparent font-bold bg-clip-text bg-gradient-to-t from-orange-700 to-orange-200'>Coordinators</div>
              <div className='flex flex-col justify-center h-max p-3 mt-2 backdrop-blur-sm w-full md:w-max'>
                <div key={index} className='relative inset-0 flex flex-wrap md:flex-col gap-4 md:gap-2'>
                  {/* Coordinators' Photos */}
                  {item.coordinators_photo.map((photo, photoIndex) => (
                    <motion.div 
                      className='inset-0 flex flex-row items-center justify-start text-white gap-5' 
                      key={photoIndex}
                    >
                      <img src={photo} alt="Coordinator Photo" className='rounded-full w-[4.5rem] md:w-[7.5rem] w-[4.5rem] md:h-[7.5rem] object-cover' />
                      <p className='text-xl lg:text-2xl'>{item.coordinators[photoIndex]}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div> : <></>}
            <div className='relative flex flex-col w-full h-full gap-2 items-center pb-2'>
              <h1 className={`text-4xl lg:text-5xl text-transparent text-center font-bold bg-clip-text bg-gradient-to-t from-orange-700 to-orange-200`}>Team</h1>
              {imageLoader && <div className='relative text-2xl text-white top-32'>Loading...</div>}
              <img
                src={item.team_photo}
                alt=""
                className={`w-[90%] md:w-[80%] lg:w-2/3 object-cover rounded-lg ${imageLoader ? 'hidden' : ''}`}
                id="group-image"
                onLoad={() => setImageLoader(false)}
              />
            </div>
          </div>
          )
        ))}
      </div>
    </div>
  )
})

export default Team
