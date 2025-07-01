import Pokedex from '@components/PokedexComponent/Pokedex'
import { PokedexProvider } from '@contexts/pokedex.context'
import { PokedexPaginationProvider } from '@contexts/pokedexPagination.context'

function PokedexPage() {
  return (
    <PokedexProvider> 
      <PokedexPaginationProvider> 
        <Pokedex />
      </PokedexPaginationProvider>
    </PokedexProvider>
  )
}

export default PokedexPage