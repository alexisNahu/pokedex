import { PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import { useDescriptionContext } from '../../contexts/description.context'

interface Props {
    megas: MegaPokemonDTO[],
    basePokemon: PokemonDTO
}

function PokemonMegas({megas}: Props) {
  const {poke, setPokemon} = useDescriptionContext()

  return (
    <div className="d-flex flex-wrap gap-2 flex-column">
      {megas.map((mega) => (
        <button key={mega.name} type="button" className="btn btn-outline-primary" onClick={() => setPokemon(mega)}>
          {mega.name}
        </button>
      ))}
      <button type='button' className='btn btn-outline-primary' onClick={() => setPokemon(poke)}>normal</button>
    </div>


  )
}

export default PokemonMegas