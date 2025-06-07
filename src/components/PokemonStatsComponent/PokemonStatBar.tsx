import { Stat } from '@models/pokemon.model'
import {ProgressBar} from 'react-progressbar-fancy'

interface Props {
  stat: Stat,
  maxStat: number,
  primaryColor: string,
  secondaryColor: string, 
}

function PokemonStatBar({stat, maxStat, primaryColor, secondaryColor}: Props) {

  return (
    <div>
      <span>{stat.value}</span>
      <ProgressBar
        className='w-100' 
        score={(stat.value / maxStat)*100}
        hideText={true}          
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        />
    </div>
  )
}

export default PokemonStatBar