import Pokedex from '@components/PokedexComponent/Pokedex'
import { PokedexProvider } from '@contexts/pokedex.context'

function PokedexPage() {
  return (
    <PokedexProvider> 
      <Pokedex />
    </PokedexProvider>
  )
}

export default PokedexPage