import { Stat, type PokemonStat } from '@models/pokemon.model'
import { ProgressBar } from 'react-bootstrap'
import PokemonStatBar from './PokemonStatBar'

interface Props {
    stats: Array<Stat>,
    maxStat: number
}


function PokemonStatsComponent({stats, maxStat}: Props) {
  const statBarColors: Record<PokemonStat, string> = {
    hp: '#66BB6A',            // Verde suave - vida
    attack: '#EF5350',        // Rojo fuerte - ataque
    defense: '#42A5F5',       // Azul medio - defensa
    specialattack: '#AB47BC', // Violeta brillante - ataque especial
    specialdefense: '#FFCA28',// Amarillo dorado - defensa especial
    speed: '#26C6DA',         // Celeste - velocidad
  };


  return (
        <ProgressBar className='d-flex flex-column bg-transparent mt-4' 
          style={{minWidth: '500px', overflow: 'visible', flexShrink: 0}}
          >
            {
              stats.map((stat, i) => <div key={stat.stat}>
                 <span>{stat.stat}: </span> <PokemonStatBar 
                  stat={stat} 
                  maxStat={maxStat} 
                  primaryColor={statBarColors[stat.stat as PokemonStat]}
                  secondaryColor={statBarColors[stat.stat as PokemonStat]}
                  />
              </div> 
              )
            }
        </ProgressBar>
  )
}

export default PokemonStatsComponent