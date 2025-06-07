import { MegaPokemonDTO } from '@models/pokemon.model'

interface Props {
    megas: MegaPokemonDTO[]
}

function PokemonMegas({megas}: Props) {
  return (
    <div>
        {megas.map((mega) => <p className='text-center align-self-center'>{mega.name}</p> )}
    </div>
  )
}

export default PokemonMegas