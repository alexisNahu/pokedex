import SingleCard from './SingleCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import { generateRandomPokedexNumber } from '@utilities/index';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UsersState } from '@redux/index';
import { RootState } from '@redux/store';
import { getActiveUser } from '@services/user.service';
import { useResolvedPath } from 'react-router-dom';
import { useMobileContext } from '@contexts/isMobile.context';

export const carouselSize = {
  width: '100%',
  height: 'auto',
}

function CardComponent({pokemonCards}: {pokemonCards: number}) {
  const randomPokedexNumbers = generateRandomPokedexNumber(pokemonCards, 10)

  const swiperKey = useMemo(() => randomPokedexNumbers.join('-'), [randomPokedexNumbers]);

  const usersState: UsersState = useSelector((store: RootState) => store.user)
  const activeUser = getActiveUser(usersState)

  const {isMobile} = useMobileContext()

  console.log(randomPokedexNumbers)

  return (
    <div style={carouselSize}>
      {activeUser ? (
        <h3 className="text-center text-xl font-semibold text-dark bg-gradient-to-r from-blue-500 to-indigo-600 py-2 rounded-md shadow-md">
          ¡Bienvenido {activeUser.username}!
        </h3>
      ) : null}
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
        { !isMobile && <>
          <div className="swiper-button-prev">
          </div>
          <div className="swiper-button-next">
          </div>
        </>
        }
      </Swiper>
    </div>
  )
}

export default CardComponent
