import { PokemonDTO } from '@models/pokemon.model'
import { Navigation } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

interface Props {
    pokemon: PokemonDTO
}

function PokemonSlide({pokemon}: Props) {
  return (
    <div className="w-100" style={{ maxHeight: '400px' }}>
        <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={10}
            slidesPerView={1}
            className="bg-white bg-opacity-25 rounded-3 p-2 border border-1 border-light w-100"
        >
            {pokemon.descriptions.map((description, i) => (
            <SwiperSlide key={i} className="p-2 w-100">
                <div className="bg-white bg-opacity-50 rounded-3 p-3 text-center">
                <span className="game-name d-block fw-bold text-primary mb-2">{description.game}</span>
                </div>
                <span className= "w-100 text-center">
                    {description.description}
                    </span>
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default PokemonSlide