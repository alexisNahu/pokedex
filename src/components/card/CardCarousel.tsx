import React from 'react'
import SingleCard from './SingleCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css';

export const carouselSize = {
  width: '100%',
  height: '900px'
}

function CardComponent() {
  return (
    <div style={carouselSize}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        spaceBetween={50}
        slidesPerView={1}
        className="h-100 mw-80 bg-poke-blue p-4 rounded-3 shadow bg-opacity-25"
      >
        <SwiperSlide className='d-flex justify-content-center'>
          <SingleCard pokemon_name="charizard" />
        </SwiperSlide>
        <SwiperSlide className='d-flex justify-content-center'>
          <SingleCard pokemon_name="meganium" />
        </SwiperSlide>
        <SwiperSlide className='d-flex justify-content-center'>
          <SingleCard pokemon_name="zekrom" />
        </SwiperSlide>

        {/* Custom navigation buttons */}
        <div className="swiper-button-prev">
        </div>
        <div className="swiper-button-next">
        </div>
      </Swiper>
    </div>
  )
}

export default CardComponent
