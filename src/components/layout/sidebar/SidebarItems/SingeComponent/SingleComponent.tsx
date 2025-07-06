import type { SingleItem } from '@models/sidebar.model'
import { useSidebarContext } from '../../sidebar.context'
import { getHidingTransition } from '../../Sidebar'
import { useNavigate } from 'react-router-dom'
import SuggestionInput from '@components/layout/AutoSuggestionsInput/SuggestionInput'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import { PUBLIC } from '@models/routes/routes'
import { getStatic3dSprite } from '@services/pokemonSprites.service'

function SingleComponent({item}: {item: SingleItem}) {
  const {activo} = useSidebarContext()

  const {pokemonList} = usePokemonNamesContext()

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


    return <div style={getHidingTransition(activo)}>
      <SuggestionInput 
        completeList={[...pokemonList]} 
        handleSuggestionsClick={(name: string) => navigator(`${PUBLIC.DESCRIPTION}/${name}`)} 
        onSubmit={(value: string) => navigator(`${PUBLIC.DESCRIPTION}/${value}`)} 
        handleSuggestionRender={handleSuggestionRender} 
        placeholder='Search for a pokemon here...'
        maxSuggestion={5}
        shouldClearInput={activo}
        />
    </div>
  }

  return (
    <div className='d-flex flex-row'>
      <button className='text-white btn bg-transparent' style={getHidingTransition(activo)} onClick={() => {item.url ? navigator(item.url) : null}}>{item.text}</button>
    </div>
  )
}

export default SingleComponent