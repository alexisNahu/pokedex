import { DescriptionLanguages, PokemonDTO } from '@models/index';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

interface Props {
  pokemon: PokemonDTO;
}

function PokedexEntrySlider({ pokemon }: Props) {

  const [languageState, setLanguageState] = useState<DescriptionLanguages>('en');

  const descriptions = {
    en: pokemon.descriptions?.en || [],
    es: pokemon.descriptions?.es || [],
    jp: pokemon.descriptions?.jp || pokemon.descriptions?.jp|| [] // Maneja ambas variantes
  };

  return (
    <div className="w-100" style={{ maxHeight: '400px' }}>
      <div className="d-flex justify-content-center gap-2 mb-3">
        {(['en', 'es', 'jp'] as DescriptionLanguages[]).map((lang) => (
          descriptions[lang]?.length > 0 && (
            <button
              key={lang}
              className={`flag ${lang} ${languageState === lang ? 'active' : ''} btn btn-outline-poke-blue`}
              onClick={() => setLanguageState(lang)}
              aria-label={`Cambiar a ${lang === 'jp' ? 'japonés' : lang === 'es' ? 'español' : 'inglés'}`}
            >
              {lang === 'jp' ? '日本語' : lang.toUpperCase()}
            </button>
          )
        ))}
      </div>


      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="bg-white bg-opacity-25 rounded-3 p-2 border border-1 border-light w-100"
        initialSlide={Object.keys(descriptions).indexOf(languageState)}
      >
        {descriptions[languageState]?.map((entry, index) => (
          <SwiperSlide key={index} className="p-2 w-100 d-flex justify-content-center">
            <div className="content w-50">
              <div className="bg-white bg-opacity-50 rounded-3 p-3 text-center">
                <span className="game-name d-block fw-bold text-primary mb-2">
                  {entry.game}
                </span>
                <p className="description-text">
                  {entry.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PokedexEntrySlider;