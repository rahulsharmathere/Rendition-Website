import React from 'react'
import { background_images } from '../constants'
import './CSS/Team.css'

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

  const numberOfRows = 5; // Define the number of rows
  const imagesPerRow = Math.floor(background_images.length / numberOfRows);

  const imageChunks = splitArrayIntoChunks(background_images, imagesPerRow, numberOfRows);

  return (
    <div className='w-screen h-screen bg-black overflow-hidden'>
      <div className='flex flex-col gap-[20px] '>
        {imageChunks.map((imageChunk, rowIndex) => (
          <div className={`flex gap-[20px] image-row ${rowIndex % 2 === 0 ? 'even' : 'odd'}`} key={rowIndex}>
            {imageChunk.map((src, index) => (
              <img src={src} alt={`Image ${index}`} key={index} className='w-[150px] h-[150px] object-cover '/>
            ))}
          </div>
        ))}
      </div>  
      {/* <div className='absolute inset-0 bg-black opacity-80'></div> */}
      <div>

      </div>
    </div>
  )
}

export default Team
