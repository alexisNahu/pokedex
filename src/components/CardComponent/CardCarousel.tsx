import SingleCard from './SingleCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import { generateRandomPokedexNumber } from '@utilities/index';
import { useMemo } from 'react';

export const carouselSize = {
  width: '100%',
  height: 'auto',
}

function CardComponent({pokemonCards}: {pokemonCards: number}) {
  const randomPokedexNumbers = generateRandomPokedexNumber(pokemonCards, 10)

  const swiperKey = useMemo(() => randomPokedexNumbers.join('-'), [randomPokedexNumbers]);

  console.log(randomPokedexNumbers)

  return (
    <div style={carouselSize}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        key={swiperKey}
        spaceBetween={50}
        slidesPerView={1}
        className="h-100 mw-80 bg-poke-blue p-4 rounded-3 shadow bg-opacity-25"
      >
        {
          randomPokedexNumbers.map((pokedexNumber, index) => {
            console.log(pokedexNumber)
            return <SwiperSlide className='d-flex justify-content-center' key={index}>
              <SingleCard pokedexNumber={`${pokedexNumber}`} />
            </SwiperSlide>
          }) 
        }

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
