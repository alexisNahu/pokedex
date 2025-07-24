import type { SingleItem } from '@models/sidebar.model'
import { useSidebarContext } from '../../sidebar.context'
import { getHidingTransition } from '../../Sidebar'
import { redirect, useNavigate } from 'react-router-dom'
import SuggestionInput from '@components/AutoSuggestionsInput/SuggestionInput'
import { PUBLIC } from '@models/routes/routes'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { useGetAllNames } from '@hooks/useQueries'

function SingleComponent({item}: {item: SingleItem}) {
  const {activo} = useSidebarContext()

  const {data: pokemonList, isLoading, error} = useGetAllNames()

  const navigator = useNavigate()


  if (item.type === 'input') {
    const handleSuggestionRender = (name: string) => {
       return <div className='d-flex flex-row justify-content-center'>
                <div className="pokemon-sprite-container d-flex flex-row align-items-center">
                    <img
                      src={`${getStatic3dSprite(name, false)}`}
                      className="img-fluid"
                      alt="mini-icon"
                      style={{ maxWidth: '48px', maxHeight: '48px' }}
                    />              
                </div>
                <span className='d-flex align-items-center'>
                    {name}
                </span>
              </div>
    }

    const handleSubmit = (value: string) => {
      if (pokemonList && pokemonList.has(value)) {
        navigator(`${PUBLIC.DESCRIPTION}/${value}`)
        return
      }

      navigator(`${PUBLIC.POKEDEX_ALL}?search=${value}`)
    }



    return (
      <div style={getHidingTransition(activo)}>
        {pokemonList ? (
          <SuggestionInput 
            completeList={[...pokemonList]} 
            handleSuggestionsClick={(name: string) => navigator(`${PUBLIC.DESCRIPTION}/${name}`)} 
            onSubmit={handleSubmit} 
            handleSuggestionRender={handleSuggestionRender} 
            placeholder='Search for a pokemon here...'
            maxSuggestion={5}
            shouldClearInput={activo}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }

  return (
    <div className='d-flex flex-row'>
      <button className='text-white btn bg-transparent' style={getHidingTransition(activo)} onClick={() => {item.url ? navigator(item.url) : null}}>{item.text}</button>
    </div>
  )
}

export default SingleComponent