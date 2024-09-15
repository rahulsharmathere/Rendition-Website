import React, { useEffect } from 'react'
import {events} from '../constants'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'
import './CSS/Events.css'

const Events = () => {
  
  const showSlider = (props) => {
    let listItemDom = document.querySelector('.carousel .list')
    let carouselDom = document.querySelector('.carousel')
    let thumbnailDom = document.querySelector('.carousel .thumbnail');
    let nextDom = document.getElementById('next')

    let itemThumnail = document.querySelectorAll('.carousel .thumbnail .item');
    let itemSlider = document.querySelectorAll('.carousel .list .item');

    console.log("list ",listItemDom, "carousel ",carouselDom, "thumbnail ", thumbnailDom )
    console.log('itemThumbnail ',itemThumnail,"itemSlider ",itemSlider)

    let timeRunning = 2000;
    let runTimeOut;
    let timeAutoNext = 5000;
    let runAutoRun;
    if(itemSlider && itemThumnail && listItemDom && carouselDom && thumbnailDom) {
      if(props === 'next') {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumnail[0]);
        carouselDom.classList.add('next');
      }
      else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumnail[positionLastItem]);
        carouselDom.classList.add('prev')
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(()=>{
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
      }, timeRunning)

      // clearTimeout(runAutoRun);
      // runAutoRun = setTimeout(()=>{
      //   nextDom.click();
      // }, timeAutoNext)
    }
  }

  return (
    <div>
      <div className="carousel relative w-screen h-screen overflow-hidden">
        <div className="list">
            {events.map((item, index)=> {
              return (
                <div className={`item absolute inset-0`}>
                  <img src={item.image} alt="" className={`w-full h-full object-cover `} />
                  <div className={`details absolute top-20 w-[1140px] max-w-screen-sm left-8 md:left-28 pr-80 sm:pr-28 box-border text-white text-shadow-custom`}>
                    <motion.div className={`author font-bold leading-6 `} variants={textVariant(1)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
                      {item.author}
                    </motion.div>
                    <motion.div className={`heading title font-bold text-4xl sm:text-7xl leading-[1.3em] `} variants={textVariant(1.2)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
                      {item.title}
                    </motion.div>
                    <motion.div className={`heading topic font-bold text-7xl leading-[1.3em] text-[#f1683a] `} variants={textVariant(1.4)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
                      {item.topic}
                    </motion.div>
                    <motion.div className="des" variants={textVariant(1.6)} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}>
                      {item.description}
                    </motion.div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="thumbnail absolute left-1/2 bottom-[50px] w-max z-50 flex gap-[20px] text-white">
          {events.slice(1).concat(events[0]).map((item, index)=> {
            return (
              <div className="item w-[150px] h-[220px] relative shrink-0" >
                <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg" />
                <div className="content absolute inset-[10px] top-3/4 ">
                  <div className="title font-bold">{item.topic}</div>
                  <div className="des">Description</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="arrows absolute left-1/4 top-3/4 w-[300px] max-w-[90px] flex gap-[10px] items-center justify-center z-20">
          <button id="prev"onClick={()=>{showSlider('prev')}} className='w-[40px] h-[40px] rounded-md bg-[#f1683a] border-none font-bold text-lg transition-all duration-500 hover:bg-[#eee] hover:text-[#555] ' > {"<"} </button>
          <button id="next" onClick={()=>{showSlider('next')}} className='w-[40px] h-[40px] rounded-md bg-[#f1683a] border-none font-bold text-lg transition-all duration-500 hover:bg-[#eee] hover:text-[#555] ' > {">"} </button>
        </div>
        <div className="time absolute w-[0px] h-[5px] bg-[#f1683a] z-30 inset-0">

        </div>
      </div>
    </div>
  )
}

export default Events
