import React, { useEffect, useState } from 'react'
import { background_images } from '../constants'
import './CSS/Team.css'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'

const Team = () => {

  const splitArrayIntoChunks = (arr, chunkSize, rowSize) => {
    const result = [];
    let index = 0;
    for (let i = 0; i < rowSize; i++) {
      result.push(arr.slice(index, index + chunkSize));
      index = index+chunkSize;
    }
    console.log(result, chunkSize, rowSize)
    return result;
  };

  const numberOfRows = 4; // Define the number of rows
  const imagesPerRow = Math.floor(background_images.length / numberOfRows);

  const imageChunks = splitArrayIntoChunks(background_images, imagesPerRow, numberOfRows);

  const batches = ["Y-21", "Y-22", "Y-23"]
  const [selectedBatch, setSelectedBatch] = useState("Y-22")

  return (
    <div className='relative w-screen h-screen bg-black overflow-hidden'>
      <div className='absolute flex flex-col gap-[10px] pt-[10px]'>
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
        <motion.div className='heading text-white p-10 font-bold text-4xl sm:text-7xl leading-[1.3em]' variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}> 
          <div className={`title font-bold text-4xl sm:text-7xl leading-[1.3em] `}>
            Team
          </div>
          <div className='flex justify-between items-center'>
            
          </div>
        </motion.div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Team
