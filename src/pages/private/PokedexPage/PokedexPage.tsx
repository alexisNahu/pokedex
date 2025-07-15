import Pokedex from '@components/PokedexComponent/Pokedex'
import { PokedexProvider } from '@contexts/pokedex.context'
import { PokedexPaginationProvider } from '@contexts/pokedexPagination.context'

function PokedexPage({ list }: { list: 'all' | 'favorites' }) {
  return (
    <PokedexProvider> 
      <PokedexPaginationProvider> 
        <Pokedex list = {list}/>
      </PokedexPaginationProvider>
    </PokedexProvider>
  )
}

export default PokedexPage