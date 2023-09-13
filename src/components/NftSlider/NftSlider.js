import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import "swiper/css"; // Import Swiper styles
import "swiper/css/effect-cards";
import { EffectCards } from "swiper"; // import required modules

import './nftSlider.css'
import AOS from 'aos';

const NftSlider = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="nftslider" title='Swipe me'>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
                
        <SwiperSlide>
        <div className="card2">          
            <img src='https://fiverrbox.com/wp-content/uploads/2022/04/cat-7022873-800332e2.png' alt="" />
            <div className="price2">
              <p className='c-price'> 
                <img src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png" alt="" /> <p className='eth'>31 ETH</p>
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card2">          
            <img src='https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300' alt="" />
            <div className="price2">
              <p className='c-price'> 
                <img src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png" alt="" /> <p className='eth'>31 ETH</p>
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <p style={{color:"gray"}}> Swipe <i class="fa-solid fa-arrow-right"></i></p>
    </div>
  )
}

export default NftSlider
